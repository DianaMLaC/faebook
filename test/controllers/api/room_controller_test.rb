require 'test_helper'

class Api::RoomControllerTest < ActionDispatch::IntegrationTest
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

  def room_params
    { description: Faker::Lorem.word }
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

  test 'when an authenticated user tries to create a room with valid params, then response is 201' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    post "/api/users/#{user.id}/rooms", params: { room: room_params }

    # Assert
    assert_response :created
    room_response = JSON.parse(@response.body)
    assert_not_nil(room_response['name'])
    assert_equal(room_params[:name], room_response['name'])
  end

  test 'when an authenticated user tries to create a room with invalid params, then response is 422' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    post "/api/users/#{user.id}/rooms", params: { room: { description: '' } }

    # Assert
    assert_response :unprocessable_entity
  end

  test 'when an unauthenticated user tries to create a room, then response is 401' do
    # Arrange
    user = create_unauthenticated_user

    # Act
    post "/api/users/#{user.id}/rooms", params: { room: room_params }

    # Assert
    assert_response :unauthorized
  end

  test 'should get all the rooms for a specific user' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post "/api/users/#{user.id}/rooms", params: { room: room_params }
    post "/api/users/#{user.id}/rooms", params: { room: room_params }

    # Act
    get "/api/users/#{user.id}/rooms"

    # Assert
    assert_response :success
    get_response = JSON.parse(@response.body)
    assert_equal(2, get_response.length)
  end

  test 'when unauthenticated requests to view rooms, then 401' do
    # Arrange
    user = create_unauthenticated_user

    # Act
    get "/api/users/#{user.id}/rooms"

    # Assert
    assert_response :unauthorized
  end
end
