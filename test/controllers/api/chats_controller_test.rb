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

  def chat_params
    { name: Faker::Lorem.word }
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

  test 'when an authenticated user tries to create a chat with valid params, then response is 201' do
    # Arrange
    create_and_sign_in_user(user_params)

    # Act
    post '/api/chats', params: { chat: chat_params }

    # Assert
    assert_response :created
    chat_response = JSON.parse(@response.body)
    assert_not_nil(chat_response['name'])
  end

  test 'when an authenticated user tries to create a chat with invalid params, then response is 422' do
    # Arrange
    create_and_sign_in_user(user_params)

    # Act
    post '/api/chats', params: { chat: { name: '' } }

    # Assert
    assert_response :unprocessable_entity
  end

  test 'when an unauthenticated user tries to create a chat, then response is 401' do
    # Act
    post '/api/chats', params: { chat: chat_params }

    # Assert
    assert_response :unauthorized
  end

  test 'should get all the chats for a specific user' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post '/api/chats', params: { chat: chat_params }
    post '/api/chats', params: { chat: chat_params }

    # Act
    get '/api/chats'

    # Assert
    assert_response :success
    get_response = JSON.parse(@response.body)
    assert_equal(2, get_response.length)
  end

  test 'when unauthenticated requests to view chats, then 401' do
    # Arrange
    create_unauthenticated_user

    # Act
    get '/api/chats'

    # Assert
    assert_response :unauthorized
  end
end
