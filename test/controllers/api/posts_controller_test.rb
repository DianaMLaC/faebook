require 'test_helper'

def user_params
  { firstName: Faker::Name.first_name,
    lastName: Faker::Name.last_name,
    password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
    dateOfBirth: '2000-10-20',
    email: Faker::Internet.email }
end

def post_text
  Faker::ChuckNorris.fact
end

class Api::PostsControllerTest < ActionDispatch::IntegrationTest
  # before post creation we need to create and log in a user.

  def sign_in_user(user_info)
    post '/api/users', params: user_info
    post '/api/authentication', params: { email: user_info[:email], password: user_info[:password] }

    JSON.parse(@response.body)
  end

  # test 'successful response when creating a post with a given text' do
  #   json_response = sign_in_user(user_params)

  #   user = User.find_by(id: json_response['id'])
  #   user_id = user.id

  #   post "/api/users/#{user_id}/posts", params: { text: post_text }
  #   assert_response :success
  # end

  # test 'failure response when creating a post with no text' do
  #   json_response = sign_in_user(user_params)

  #   user = User.find_by(id: json_response['id'])
  #   user_id = user.id

  #   post "/api/users/#{user_id}/posts"
  #   assert_response 422
  # end

  test 'successful response when creating a post with a given text and author_id' do
    json_response = sign_in_user(user_params)

    user = User.find_by(id: json_response['id'])
    user_full_name = user.first_name + ' ' + user.last_name

    post "/api/users/#{user.id}/posts", params: { text: post_text, author: user.id }
    assert_response :success

    post_response = JSON.parse(@response.body)
    # check for text, author, createdAt
    assert_not_nil(post_response['text'])
    assert_not_nil(post_response['author'])
    assert_not_nil(post_response['createdAt'])
    # check for display name matching author's first + last name
    assert_not_nil(post_response['author']['displayName'])
    assert_equal(user_full_name, post_response['author']['displayName'])
    # check for author_id being the same as the id in the URI
    assert_equal(user.id, post_response['author']['id'])
  end

  test 'failure when creating a post without a user logged in' do
    user = User.create!(first_name: Faker::Name.first_name,
                        last_name: Faker::Name.last_name,
                        password: Faker::Internet.password(min_length: 6, mix_case: true,
                                                           special_characters: true),
                        date_of_birth: '2000-10-20',
                        email: Faker::Internet.email)

    # assert_nil(user.id)
    post "/api/users/#{user.id}/posts", params: { text: post_text, author: user.id }
    assert_response 401
  end
end
