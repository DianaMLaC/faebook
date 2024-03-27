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

class Api::FriendshipsControllerTest < ActionDispatch::IntegrationTest
  test 'when a user requests a friendship with other user, then response is 200' do
    # Arrange
    user_one = create_and_sign_in_user(user_params)
    reset!
    user_two = create_and_sign_in_user(user_params)
    # Act
    post "/api/users/#{user_one.id}/friendships"

    # Assert
    assert_response :success

    res = JSON.parse(@response.body)
    # assert_nil(res)
    assert_equal(false, res['friendship'])

    friendship = Friendship.all.first

    assert_equal(1, Friendship.count)
    assert_equal(user_one.id, friendship.receiver_id)
    assert_equal(user_two.id, friendship.sender_id)
    assert_equal(user_one.sent_friendships, friendship)
    assert_equal(user_one.received_friendships, friendship)
  end
end
