require 'test_helper'

class Api::MessagesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def user_params
    { firstName: Faker::Name.first_name,
      lastName: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      dateOfBirth: '2000-10-20',
      email: Faker::Internet.email }
  end

  def chat_params
    { name: Faker::Lorem.word }
  end

  def message_params
    { body: Faker::Lorem.sentence }
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

  def create_chat_for_users(user_one, user_two)
    post '/api/chats', params: { recipient_id: user_two.id, sender_id: user_one.id }
    JSON.parse(@response.body)
  end

  test 'when an authenticated user tries to create a message with valid params, then response is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    other_user = create_and_sign_in_user(user_params)

    chat = create_chat_for_users(user, other_user)
    body = Faker::Lorem.sentence

    # Act
    post "/api/chats/#{chat['id']}/messages", params: { message: { body:, sender_id: user.id } }

    # Assert
    assert_response 200
    message_response = JSON.parse(@response.body)
    assert_not_nil(message_response['body'])
    assert_equal(body, message_response['body'])
  end

  test 'when an authenticated user tries to create a message with invalid params, then response is 422' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    other_user = create_and_sign_in_user(user_params)

    chat = create_chat_for_users(user, other_user)

    # Act
    post "/api/chats/#{chat['id']}/messages", params: { message: { body: '', sender_id: user.id } }

    # Assert
    assert_response :unprocessable_entity
  end

  test 'when an unauthenticated user tries to create a message, then response is 401' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    other_user = create_and_sign_in_user(user_params)
    chat = create_chat_for_users(user, other_user)
    reset!
    # Act
    post "/api/chats/#{chat['id']}/messages", params: { message: message_params }

    # Assert
    assert_response :unauthorized
  end

  test 'should get all messages for a specific chat' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    other_user = create_and_sign_in_user(user_params)
    chat = create_chat_for_users(user, other_user)
    post "/api/chats/#{chat['id']}/messages", params: { message: { body:, sender_id: user.id } }
    post "/api/chats/#{chat['id']}/messages", params: { message: { body:, sender_id: user.id } }
    post "/api/chats/#{chat['id']}/messages", params: { message: { body:, sender_id: other_user.id } }

    # Act
    get "/api/chats/#{chat['id']}/messages"

    # Assert
    assert_response :success
    get_response = JSON.parse(@response.body)
    assert_equal(3, get_response.length)
  end

  test 'when unauthenticated requests to view messages, then 401' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    other_user = create_and_sign_in_user(user_params)
    chat = create_chat_for_users(user, other_user)
    post "/api/chats/#{chat['id']}/messages", params: { message: { body:, sender_id: user.id } }
    reset!

    # Act
    get "/api/chats/#{chat['id']}/messages"

    # Assert
    assert_response :unauthorized
  end
end
