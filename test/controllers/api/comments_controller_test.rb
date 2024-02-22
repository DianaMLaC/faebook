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

  def post_body
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
    post "/api/users/#{user_id}/posts", params: { body: post_body }
    post_response = JSON.parse(@response.body)
    post = Post.find_by(id: post_response['id'])
    post.id
  end

  test 'success response when an authenticated user comments on a post' do
    # create user
    user_id = sign_in_user(user_params)
    # create post
    post_id = create_post(user_id)
    # create comment

    post "/api/users/#{user_id}/posts/#{post_id}/comments"
    assert_response :success
    # check response to include : id, text, createdAt, author details
    comment_response = JSON.parse(@response.body)
    assert_not_nil(comment_response['id'])
  end
end
