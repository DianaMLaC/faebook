# require 'test_helper'

# class Api::MessagesControllerTest < ActionDispatch::IntegrationTest
#   # test "the truth" do
#   #   assert true
#   # end

#   def user_params
#     { firstName: Faker::Name.first_name,
#       lastName: Faker::Name.last_name,
#       password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
#       dateOfBirth: '2000-10-20',
#       email: Faker::Internet.email }
#   end

#   def room_params
#     { description: Faker::Lorem.word }
#   end

#   def message_params
#     { body: Faker::Lorem.sentence }
#   end

#   def create_and_sign_in_user(user_info)
#     post '/api/users', params: { user: user_info }

#     user_response = JSON.parse(@response.body)
#     User.find_by(id: user_response['id'])
#   end

#   def create_unauthenticated_user
#     User.create!(first_name: Faker::Name.first_name,
#                  last_name: Faker::Name.last_name,
#                  password: Faker::Internet.password(min_length: 6, mix_case: true,
#                                                     special_characters: true),
#                  date_of_birth: '2000-10-20',
#                  email: Faker::Internet.email)
#   end

#   def create_room_for_user(user)
#     post "/api/users/#{user.id}/rooms", params: { room: room_params }
#     JSON.parse(@response.body)
#   end

#   test 'when an authenticated user tries to create a message with valid params, then response is 201' do
#     # Arrange
#     user = create_and_sign_in_user(user_params)
#     room = create_room_for_user(user)

#     # Act
#     post "/api/users/#{user.id}/rooms/#{room['id']}/messages", params: { message: message_params }

#     # Assert
#     assert_response :created
#     message_response = JSON.parse(@response.body)
#     assert_not_nil(message_response['content'])
#     assert_equal(message_params[:body], message_response['body'])
#   end

#   test 'when an authenticated user tries to create a message with invalid params, then response is 422' do
#     # Arrange
#     user = create_and_sign_in_user(user_params)
#     room = create_room_for_user(user)

#     # Act
#     post "/api/users/#{user.id}/rooms/#{room['id']}/messages", params: { message: { body: '' } }

#     # Assert
#     assert_response :unprocessable_entity
#   end

#   test 'when an unauthenticated user tries to create a message, then response is 401' do
#     # Arrange
#     user = create_unauthenticated_user
#     room = create_room_for_user(user)

#     # Act
#     post "/api/users/#{user.id}/rooms/#{room['id']}/messages", params: { message: message_params }

#     # Assert
#     assert_response :unauthorized
#   end

#   test 'should get all messages for a specific room' do
#     # Arrange
#     user = create_and_sign_in_user(user_params)
#     room = create_room_for_user(user)
#     post "/api/users/#{user.id}/rooms/#{room['id']}/messages", params: { message: message_params }
#     post "/api/users/#{user.id}/rooms/#{room['id']}/messages", params: { message: message_params }

#     # Act
#     get "/api/users/#{user.id}/rooms/#{room['id']}/messages"

#     # Assert
#     assert_response :success
#     get_response = JSON.parse(@response.body)
#     assert_equal(2, get_response.length)
#   end

#   test 'when unauthenticated requests to view messages, then 401' do
#     # Arrange
#     user = create_unauthenticated_user
#     room = create_room_for_user(user)

#     # Act
#     get "/api/users/#{user.id}/rooms/#{room['id']}/messages"

#     # Assert
#     assert_response :unauthorized
#   end
# end
