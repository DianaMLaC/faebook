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

class Api::FriendsControllerTest < ActionDispatch::IntegrationTest
  test 'when a user requests a friendship with other user, then response is 200' do
    # Arrange
    user_one = create_and_sign_in_user(user_params)
    reset!
    user_two = create_and_sign_in_user(user_params)
    # Act
    post "/api/users/#{user_one.id}/friends"

    # Assert
    assert_response :success

    res = JSON.parse(@response.body)
    assert_equal('pending', res['status'])

    assert_equal(1, Friends.all)
    assert_equal(user_one.id, Friends.all.first.receiver_id)
    assert_equal(user_two.id, Friends.all.first.sender_id)
  end
end
