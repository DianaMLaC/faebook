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

  test 'successful response when creating a post with a given text' do
    json_response = sign_in_user(user_params)

    user = User.find_by(id: json_response['id'])
    user_id = user.id

    post "/api/users/#{user_id}/posts", params: { text: post_text }
    assert_response :success
  end
end
