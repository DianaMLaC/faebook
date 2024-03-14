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

  def sign_in_user(user_info)
    post '/api/users', params: user_info
    post '/api/authentication', params: { email: user_info[:email], password: user_info[:password] }

    user_response = JSON.parse(@response.body)
    user = User.find_by(id: user_response['id'])
    user.id
  end

  def create_post(user_id)
    post "/api/users/#{user_id}/posts", params: { body: faker_text }
    post_response = JSON.parse(@response.body)
    post = Post.find_by(id: post_response['id'])
    post.id
  end

  test 'when an authenticated user comments on a post' do
    # arrange
    user_id = sign_in_user(user_params)
    Post.create(body: faker_text, author_id: user_id, profile_id: user_id)
    post = Post.find_by(author_id: user_id)

    # act
    post "/api/users/#{user_id}/posts/#{post.id}/comments", params: { text: faker_text }
    comment_response = JSON.parse(@response.body)
    comment = Comment.find_by(author_id: user_id)
    # assert
    assert_not_nil(post)
    assert_not_nil(comment)
    assert_equal(comment_response['author']['id'], comment.author_id)
    assert_not_nil(comment_response['author']['displayName'])
    assert_not_nil(comment_response['createdAt'])
  end

  # test 'failure response when an unauthorized user comments on a post' do

  # end
end
