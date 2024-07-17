require 'test_helper'

def user_params
  { firstName: Faker::Name.first_name,
    lastName: Faker::Name.last_name,
    password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
    dateOfBirth: '2000-10-20',
    email: Faker::Internet.email }
end

def faker_text
  Faker::ChuckNorris.fact
end

def create_unauthenticated_user
  User.create!(first_name: Faker::Name.first_name,
               last_name: Faker::Name.last_name,
               password: Faker::Internet.password(min_length: 6, mix_case: true,
                                                  special_characters: true),
               date_of_birth: '2000-10-20',
               email: Faker::Internet.email)
end

def create_and_sign_in_user(user_info)
  post '/api/users', params: { user: user_info }

  user_response = JSON.parse(@response.body)
  User.find_by(id: user_response['id'])
end

def create_friendship(user_one, user_two)
  Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: true)
end

class Api::CommentsControllerTest < ActionDispatch::IntegrationTest
  # helper methods

  test 'when an authenticated user comments on a post' do
    # ARRANGE
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    comment_text = faker_text

    # ACT
    post(
      "/api/posts/#{post_obj.id}/comments",
      params: {
        comment: { text: comment_text }
      },
      headers: { Authorization: "Bearer #{post_author.session_token}" }
    )

    # ASSERT
    # assert_equal(session[:auth_token], post_author.session_token)
    assert_response :success

    # check response body
    res = JSON.parse(@response.body)
    assert_not_nil(res['id'])
    assert_not_nil(res['createdAt'])
    assert_equal(comment_text, res['text'])
    assert_equal(post_obj.id, res['postId'])

    # check comment author
    assert_equal(post_author.id, res['author']['id'])
    assert_equal(post_author.display_name, res['author']['displayName'])

    # check db
    assert_equal(Comment.last.id, res['id'])
    assert(Comment.all.length == 1)
  end

  test 'when post id does not exist' do
    # ARRANGE
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    comment_text = faker_text

    # ACT
    post(
      "/api/posts/#{post_obj.id}err/comments",
      params: { text: comment_text }
    )

    # ASSERT
    assert_response :not_found
    assert(Comment.all.length == 0)
  end

  test 'when comment has no text' do
    # ARRANGE
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    comment_text = faker_text

    # ACT

    post(
      "/api/posts/#{post_obj.id}/comments",
      params: {
        comment: { text: '' }
      },
      headers: { Authorization: "Bearer #{post_author.session_token}" }
    )

    # ASSERT
    assert_response 422
    res = JSON.parse(@response.body)
    assert_equal({
                   'errors' => {
                     'comment' => {
                       'text' => "Text can't be blank"
                     }
                   }
                 }, res)
  end

  test 'when an unauthorized user comments on a post' do
    # ARRANGE
    author = create_and_sign_in_user(user_params)
    # create post
    post_obj = Post.create!(
      body: faker_text,
      author_id: author.id,
      profile_id: author.id
    )
    # log out user
    reset!

    # ACT
    post(
      "/api/posts/#{post_obj.id}/comments",
      params: { text: faker_text }
    )

    # ASSERT
    assert_response :unauthorized
    assert(Comment.all.length == 0)
  end

  test 'when a user tries to comment on a strangers profile, return 422' do
    # ARRANGE
    user_profile = create_and_sign_in_user(user_params)
    reset!
    post_author = create_and_sign_in_user(user_params)
    reset!
    another_user = create_and_sign_in_user(user_params)

    create_friendship(user_profile, post_author)
    create_friendship(another_user, post_author)

    # create post
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: user_profile.id
    )

    # Act
    post(
      "/api/posts/#{post_obj.id}/comments",
      params: { text: faker_text }
    )

    # Assert
    assert_response 422
  end

  test 'when a user tries to comment on a friends profile, but is not friends with the post_author, return 200' do
    # ARRANGE
    user_profile = create_and_sign_in_user(user_params)
    reset!
    post_author = create_and_sign_in_user(user_params)
    reset!
    another_user = create_and_sign_in_user(user_params)

    create_friendship(user_profile, another_user)
    create_friendship(user_profile, post_author)

    # create post
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: user_profile.id
    )

    # Act

    post(
      "/api/posts/#{post_obj.id}/comments",
      params: {
        comment: { text: faker_text }
      },
      headers: { Authorization: "Bearer #{post_author.session_token}" }
    )

    # Assert
    assert_response :success
  end

  test 'when there are no comments we return []' do
    # ARRANGE
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )

    # ACT
    get(
      "/api/posts/#{post_obj.id}/comments"
    )

    # ASSERT
    assert_response :success
    assert_not_nil(@response.body)
    get_response = JSON.parse(@response.body)
    assert_equal([], get_response['comments'])
  end

  test 'when a user comments on another comment' do
    # ARRANGE
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )

    parent_comment = Comment.create!(
      text: faker_text,
      author_id: post_author.id,
      post_id: post_obj.id
    )

    # ACT

    post(
      "/api/posts/#{post_obj.id}/comments",
      params: {
        comment: {
          text: faker_text,
          parent_comment_id: parent_comment.id
        }
      },
      headers: { Authorization: "Bearer #{post_author.session_token}" }
    )

    # ASSERT

    assert_response :success
    resp = JSON.parse(@response.body)

    assert_equal(parent_comment.id, resp['parentCommentId'])
    assert_equal(parent_comment.id, Comment.order(created_at: :asc).last.parent_comment_id)
  end

  test 'when we get comments then it shows their replies (if any)' do
    # ARRANGE
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )

    top_level_comment = Comment.create!(
      author_id: post_author.id,
      text: faker_text,
      post_id: post_obj.id
    )

    first_reply = Comment.create!(
      author_id: post_author.id,
      text: faker_text,
      post_id: post_obj.id,
      parent_comment_id: top_level_comment.id
    )

    second_reply = Comment.create!(
      author_id: post_author.id,
      text: faker_text,
      post_id: post_obj.id,
      parent_comment_id: top_level_comment.id
    )

    # ACT
    get("/api/posts/#{post_obj.id}/comments")

    # ASSERT
    assert_response :success
    resp = JSON.parse(@response.body)
    comment_body = resp['comments']
    assert_equal(1, comment_body.length)

    top_comment_json = comment_body[0]
    replies = top_comment_json['replies']
    assert_equal(2, replies.length)
    assert_equal(first_reply.id, replies[0]['id'])
    assert_equal(top_level_comment.id, replies[0]['parentCommentId'])

    assert_equal(second_reply.id, replies[1]['id'])
    assert_equal(top_level_comment.id, replies[1]['parentCommentId'])
    assert_equal([], replies[1]['replies'])

    # check DB
    assert_equal(3, Comment.all.length)
  end

  test 'when a user tries to comment on a reply then it should fail' do
    # ARRANGE
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )

    top_level_comment = Comment.create!(
      author_id: post_author.id,
      text: faker_text,
      post_id: post_obj.id
    )

    reply = Comment.create!(
      author_id: post_author.id,
      text: faker_text,
      post_id: post_obj.id,
      parent_comment_id: top_level_comment.id
    )

    # ACT

    post(
      "/api/posts/#{post_obj.id}/comments",
      params: {
        comment: {
          text: faker_text,
          parent_comment_id: reply.id
        }
      },
      headers: { Authorization: "Bearer #{post_author.session_token}" }
    )

    # ASSERT
    assert_response 422
    assert_equal(2, Comment.all.count)
  end
end
