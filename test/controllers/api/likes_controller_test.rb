require 'test_helper'

def user_params
  { firstName: Faker::Name.first_name,
    lastName: Faker::Name.last_name,
    password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
    dateOfBirth: '2000-10-20',
    email: Faker::Internet.email }
end

def create_and_sign_in_user(user_info)
  post '/api/users', params: user_info

  user_response = JSON.parse(@response.body)
  User.find_by(id: user_response['id'])
end

def faker_text
  Faker::ChuckNorris.fact
end

def create_post(user)
  Post.create!(body: faker_text,
               author_id: user.id,
               profile_id: user.id)
end

def create_comment(user, post, parent_comment_id = nil)
  Comment.create!(text: faker_text,
                  author_id: user.id,
                  post_id: post.id,
                  parent_comment_id:)
end

def create_like(likeable, user)
  Like.create!(likeable_id: likeable.id,
               likeable_type: likeable.class,
               liker_id: user.id)
end

def create_friendship(user_one, user_two)
  Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: true)
end

def toggle_like(likeable, user = nil)
  likeable_type = likeable.class.to_s.underscore.pluralize
  headers = {}
  headers['Authorization'] = "Token #{user.session_token}" if user.present?

  # Assuming the toggle_like action uses a POST method
  post("/api/#{likeable_type}/#{likeable.id}/likes/toggle_like", headers:)
end

def fetch_likes(likeable)
  likeable_type = likeable.class.to_s.underscore.pluralize
  get("/api/#{likeable_type}/#{likeable.id}/likes")
end

class Api::LikesControllerTest < ActionDispatch::IntegrationTest
  # TEST FOR LIKES ON POSTS

  test 'when a user likes his own post then response is 200' do
    # then it's a success(200) with response body

    # Arrange
    user = create_and_sign_in_user(user_params)
    post_obj = create_post(user)

    # Act
    toggle_like(post_obj)

    # Assert
    assert_response :success
    like_res = JSON.parse(@response.body)
    assert_not_nil(like_res)
    assert_not_nil(like_res['id'])
    assert_equal(post_obj.id, like_res['likeableId'])
    assert_equal('Post', like_res['likeableType'])
    assert_equal(user.id, like_res['liker']['id'])
    assert_equal(user.display_name, like_res['liker']['displayName'])

    assert_equal(1, Like.count)
    like = Like.first
    assert_equal(post_obj.id, like.likeable_id)
    assert_equal('Post', like.likeable_type)
    assert_equal(user.id, like.liker_id)
  end

  test 'when an unauthenticated user tries to like a post then response is 401' do
    # then failure, 401

    # Arrange
    user = User.create!(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      date_of_birth: '2000-10-20',
      email: Faker::Internet.email
    )

    post_author = create_and_sign_in_user(user_params)
    post_obj = create_post(post_author)
    # log out user
    reset!

    # Act

    toggle_like(post_obj, user)
    # Assert

    assert_response 401
    res = JSON.parse(@response.body)
    assert_equal({
                   'errors' => {
                     'authentication' => 'Unauthorized! User need to sign in/ log in'
                   }
                 }, res)

    assert_equal([], Like.all)
  end

  test 'when a user tries to like a post that does not exist then response is 404' do
    # Arrange
    liker = create_and_sign_in_user(user_params)
    post_obj = create_post(liker)
    post_obj.delete

    # Act
    toggle_like(post_obj, liker)

    # Assert
    assert_response 404
    assert_equal([], Like.all)
  end

  test 'when a user tries to like another friends post, then response is 200' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = create_post(post_author)

    reset!

    user_two = create_and_sign_in_user(user_params)
    create_friendship(user_two, post_author)
    # Act
    toggle_like(post_obj)

    # Assert

    assert_response :success
    assert_equal(1, Like.count)
  end

  test 'when a user tries to like another non_friend_users post, then response is 200' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = create_post(post_author)
    reset!
    user_two = create_and_sign_in_user(user_params)
    # Act
    toggle_like(post_obj)

    # Assert

    assert_response :success
    assert_equal(1, Like.count)
  end

  test 'when an unauthenticated user unlikes a post he likes then response is 401' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = create_post(post_author)
    create_like(post_obj, post_author)

    reset!
    # Act
    toggle_like(post_obj, post_author)

    # Assert
    assert_response 401
    assert_equal(1, Like.all.length)
  end

  test 'toggling a like on and off' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post = create_post(user)

    # Act (like post)
    toggle_like(post, user)
    assert_equal(1, Like.count)

    # Act (unlike post)
    toggle_like(post, user)
    assert_equal(0, Like.count)

    # Act (like post again)
    toggle_like(post, user)
    assert_equal(1, Like.count)
  end

  test 'when there are no likes on a post we return []' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = create_post(post_author)

    # Act
    fetch_likes(post_obj)
    # Assert
    assert_response :success
    res = JSON.parse(@response.body)
    assert_equal([], res['likes'])
    assert_equal(0, Like.all.length)
  end

  test 'when there are likes we return an array with each attribute of the like' do
    post_author = create_and_sign_in_user(user_params)
    post_obj = create_post(post_author)
    like_one = create_like(post_obj, post_author)

    reset!
    new_user = create_and_sign_in_user(user_params)
    like_two = create_like(post_obj, new_user)

    # Act
    fetch_likes(post_obj)

    # Assert
    assert_response :success
    res = JSON.parse(@response.body)
    assert_not_nil(res['likes'].first['id'])
    assert_equal(post_obj.id, res['likes'].first['likeableId'])
    assert_equal('Post', res['likes'].first['likeableType'])
    assert_not_nil(res['likes'].first['liker']['id'])
    assert_not_nil(res['likes'].first['liker']['displayName'])

    assert_equal(2, Like.all.length)
  end

  # TESTS FOR LIKES ON COMMENTS

  test 'when a user likes his own comment then response is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post = create_post(user)
    comment = create_comment(user, post)

    # Act
    toggle_like(comment, user)

    # Assert
    assert_not_nil(user)
    assert_not_nil(post)
    assert_not_nil(comment)

    assert_response :success
    like_res = JSON.parse(@response.body)
    assert_not_nil(like_res)
    assert_not_nil(like_res['id'])
    assert_equal(comment.id, like_res['likeableId'])
    assert_equal('Comment', like_res['likeableType'])
    assert_equal(user.id, like_res['liker']['id'])
    assert_equal(user.display_name, like_res['liker']['displayName'])

    assert_equal(1, Like.count)
    like = Like.first
    assert_equal(comment.id, like.likeable_id)
    assert_equal('Comment', like.likeable_type)
    assert_equal(user.id, like.liker_id)
  end

  test 'when an unauthenticated user tries to like a comment then response is 401' do
    # Arrange
    user = User.create!(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      date_of_birth: '2000-10-20',
      email: Faker::Internet.email
    )

    post_author = create_and_sign_in_user(user_params)
    post_obj = create_post(post_author)
    comment = create_comment(post_author, post_obj)
    # log out user
    reset!

    # Act
    toggle_like(comment, user)

    # Assert
    assert_response 401
    res = JSON.parse(@response.body)
    assert_equal({
                   'errors' => {
                     'authentication' => 'Unauthorized! User need to sign in/ log in'
                   }
                 }, res)

    assert_equal([], Like.all)
  end

  test 'when a user tries to like a comment that does not exist then response is 404' do
    # Arrange
    liker = create_and_sign_in_user(user_params)
    post = create_post(liker)
    comment = create_comment(liker, post)
    comment.delete

    # Act
    toggle_like(comment, liker)

    # Assert
    assert_response 404
    assert_equal([], Like.all)
  end

  test 'when a user tries to like another friends comment, then response is 200' do
    # Arrange
    user_one = create_and_sign_in_user(user_params)
    post = create_post(user_one)
    comment = create_comment(user_one, post)
    reset!

    user_two = create_and_sign_in_user(user_params)
    create_friendship(user_two, user_one)
    # Act
    toggle_like(comment)

    # Assert

    assert_response :success
    assert_equal(1, Like.count)
  end

  test 'when a user tries to like another non_friend_users comment, then response is 200' do
    # Arrange
    user_one = create_and_sign_in_user(user_params)
    post = create_post(user_one)
    comment = create_comment(user_one, post)
    reset!

    create_and_sign_in_user(user_params)
    # Act
    toggle_like(comment)

    # Assert

    assert_response :success
    assert_equal(1, Like.count)
  end

  test 'when an unauthenticated user unlikes a comment he likes then response is 401' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post = create_post(user)
    comment = create_comment(user, post)
    like = create_like(comment, user)

    reset!
    # Act
    toggle_like(comment, user)

    # Assert
    assert_response 401
    assert_equal(1, Like.all.length)
  end

  test 'when there are no likes on a comment we return []' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post = create_post(user)
    comment = create_comment(user, post)

    # Act
    fetch_likes(comment)
    # Assert
    assert_response :success
    res = JSON.parse(@response.body)
    assert_equal([], res['likes'])
    assert_equal(0, Like.all.length)
  end

  test 'when there are likes on comments we return an array with each attribute of the like' do
    user = create_and_sign_in_user(user_params)
    post = create_post(user)
    comment = create_comment(user, post)
    like_one = create_like(comment, user)

    reset!
    new_user = create_and_sign_in_user(user_params)
    like_two = create_like(comment, new_user)

    # Act
    fetch_likes(comment)

    # Assert
    assert_response :success
    res = JSON.parse(@response.body)
    assert_not_nil(res['likes'].first['id'])
    assert_equal(comment.id, res['likes'].first['likeableId'])
    assert_equal('Comment', res['likes'].first['likeableType'])
    assert_not_nil(res['likes'].first['liker']['id'])
    assert_not_nil(res['likes'].first['liker']['displayName'])

    assert_equal(2, Like.all.length)
  end

  test 'when a user likes his own reply on a comment then response is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post = create_post(user)
    comment = create_comment(user, post)
    reply = create_comment(user, post, comment.id)

    # Act
    toggle_like(reply, user)

    # Assert
    assert_not_nil(user)
    assert_not_nil(post)
    assert_not_nil(reply)

    assert_response :success
    like_res = JSON.parse(@response.body)
    assert_not_nil(like_res)
    assert_not_nil(like_res['id'])
    assert_equal(reply.id, like_res['likeableId'])
    assert_equal('Comment', like_res['likeableType'])
    assert_equal(user.id, like_res['liker']['id'])
    assert_equal(user.display_name, like_res['liker']['displayName'])

    assert_equal(1, Like.count)
    like = Like.first
    assert_equal(reply.id, like.likeable_id)
    assert_equal('Comment', like.likeable_type)
    assert_equal(user.id, like.liker_id)
  end
end
