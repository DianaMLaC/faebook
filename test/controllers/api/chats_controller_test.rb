require 'test_helper'
# require 'helpers/auth_helper'

class Api::ChatControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  # include AuthHelper

  def user_params
    { firstName: Faker::Name.first_name,
      lastName: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      dateOfBirth: '2000-10-20',
      email: Faker::Internet.email }
  end

  def create_and_sign_in_user(user_info)
    post '/api/users', params: { user: user_info }

    user_response = JSON.parse(@response.body)
    User.find_by(id: user_response['id'])
  end

  def create_unauthenticated_user
    User.create!(first_name: Faker::Name.first_name,
                 last_name: Faker::Name.last_name,
                 password: Faker::Internet.password(min_length: 6, mix_case: true,
                                                    special_characters: true),
                 date_of_birth: '2000-10-20',
                 email: Faker::Internet.email)
  end

  test 'when an authenticated user tries to create a chat with valid params, then response is 200' do
    # Arrange
    user_two = create_and_sign_in_user(user_params)
    reset!

    user_one = create_and_sign_in_user(user_params)

    # Act
    post '/api/chats', params: { recipient_id: user_two.id, sender_id: user_one.id }

    # Assert
    assert_response 200
    chat_response = JSON.parse(@response.body)
    assert_not_nil(chat_response['name'])
  end

  test 'when an authenticated user tries to create a chat with invalid params, then response is 404' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    post '/api/chats', params: { sender_id: user.id, recipient_id: '' }

    # Assert
    assert_response 404
  end

  test 'when an unauthenticated user tries to create a chat, then response is 401' do
    # Arrange
    user_two = create_and_sign_in_user(user_params)
    reset!

    user_one = create_and_sign_in_user(user_params)
    reset!
    # Act
    post '/api/chats', params: { recipient_id: user_two.id, sender_id: user_one.id }

    # Assert
    assert_response :unauthorized
  end

  test 'should get all the chats for a specific user' do
    # Arrange
    user_two = create_and_sign_in_user(user_params)
    reset!

    user_one = create_and_sign_in_user(user_params)
    reset!

    user_three = create_and_sign_in_user(user_params)
    post '/api/chats', params: { recipient_id: user_three.id, sender_id: user_one.id }
    post '/api/chats', params: { recipient_id: user_three.id, sender_id: user_two.id }

    # Act
    get '/api/chats'

    # Assert
    assert_response :success
    get_response = JSON.parse(@response.body)
    assert_equal(2, get_response.length)
  end

  test 'when unauthenticated requests to view chats, then 401' do
    # Act
    get '/api/chats'

    # Assert
    assert_response :unauthorized
  end
end
