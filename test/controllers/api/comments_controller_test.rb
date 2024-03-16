require 'test_helper'

class Api::CommentsControllerTest < ActionDispatch::IntegrationTest
  # helper methods
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
    post '/api/users', params: user_info

    user_response = JSON.parse(@response.body)
    User.find_by(id: user_response['id'])
  end

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
      "/api/users/#{post_author.id}/posts/#{post_obj.id}/comments",
      params: { text: comment_text }
    )

    # ASSERT
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

  test 'when post id doesnt exist' do
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
      "/api/users/#{post_author.id}/posts/#{post_obj.id}err/comments",
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
      "/api/users/#{post_author.id}/posts/#{post_obj.id}/comments",
      params: {}
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

  test 'failure response when an unauthorized user comments on a post' do
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
      "/api/users/#{author.id}/posts/#{post_obj.id}/comments",
      params: { text: faker_text }
    )

    # ASSERT
    assert_response :unauthorized
    assert(Comment.all.length == 0)
  end
end
