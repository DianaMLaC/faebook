# require 'test_helper'

# def user_params
#   { firstName: Faker::Name.first_name,
#     lastName: Faker::Name.last_name,
#     password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
#     dateOfBirth: '2000-10-20',
#     email: Faker::Internet.email }
# end

# def create_and_sign_in_user(user_info)
#   post '/api/users', params: { user: user_info }

#   user_response = JSON.parse(@response.body)
#   User.find_by(id: user_response['id'])
# end

# class Api::FriendshipsControllerTest < ActionDispatch::IntegrationTest
#   # CREATE (REQUEST)
#   test 'when a user requests a friendship with other user, then response is 200' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     # Act
#     post "/api/users/#{user_one.id}/friendships"

#     # Assert
#     assert_response :success

#     res = JSON.parse(@response.body)
#     assert_equal(false, res['friendshipStatus'])
#     assert_equal(user_one.id, res['user']['id'])

#     friendship = Friendship.all.first
#     assert_equal(1, Friendship.count)
#     assert_equal(user_one.id, friendship.receiver_id)
#     assert_equal(user_two.id, friendship.sender_id)
#     assert_not_includes(user_one.received_friends, user_two)
#     assert_includes(user_two.sent_friendships, friendship)
#     assert_includes(user_one.received_friendships, friendship)
#   end

#   test 'when an unauthenticated user requests a friendship with other user, then response is 401 unauthorized' do
#     # Arrange
#     user = create_and_sign_in_user(user_params)
#     reset!

#     # Act
#     post "/api/users/#{user.id}/friendships"

#     # Assert
#     assert_response 401
#     assert_equal(0, Friendship.count)
#   end

#   test 'test' do
#     # Arrange

#     create_and_sign_in_user(user_params)

#     # Act
#     post "/api/users/#{SecureRandom.uuid}/friendships"

#     # Assert
#     assert_response 404
#   end

#   test 'when a user requests a friendship with a user that he is already friends with, then response is 403' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)

#     Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: true)

#     # Act
#     post "/api/users/#{user_one.id}/friendships"

#     # Assert
#     assert_response 403
#     assert_equal(1, Friendship.count)
#   end

#   test 'when a user requests a friendship with a user that has a pending request from the same user, then response is 403' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)

#     Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: false)

#     # Act
#     post "/api/users/#{user_one.id}/friendships"

#     # Assert
#     assert_response 403
#     assert_equal(1, Friendship.count)
#   end

#   test 'when a user requests a friendship with himself, then response is 422' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)

#     # Act
#     post "/api/users/#{user_one.id}/friendships"

#     # Assert
#     assert_response 422
#     res = JSON.parse(@response.body)
#     assert_includes(res['errors'], "Receiver can't be the same as sender")
#     assert_equal(0, Friendship.count)
#   end

#   # UPDATE (ACCEPT)

#   test 'when  a user accepts a friend request, then response is 200' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: false)

#     # Act
#     patch "/api/friendships/#{friendship.id}/accept"

#     # Assert
#     assert_response :success
#     res = JSON.parse(@response.body)
#     friendship.reload

#     assert_equal(true, friendship.is_accepted)
#     assert_equal(true, res['friendshipStatus'])
#     assert_equal(1, Friendship.count)
#     assert_equal(true, Friendship.all.first.is_accepted)
#   end

#   test 'when a user that requested a friendship tries to change the status' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: false)

#     # Act
#     patch "/api/friendships/#{friendship.id}/accept"

#     # Assert
#     assert_response 403
#     assert_equal(1, Friendship.count)
#     assert_equal(false, Friendship.all.first.is_accepted)
#   end

#   test 'when a user tries to accept a friend request already accepted, then response is 422' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: true)

#     # Act
#     patch "/api/friendships/#{friendship.id}/accept"

#     # Assert
#     assert_response 422
#     assert_equal(1, Friendship.count)
#     assert_equal(true, Friendship.all.first.is_accepted)
#   end

#   test 'when a user tries to accept a friend request that has been sent to someone else, then response is 403' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     reset!
#     user_three = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: false)

#     # Act
#     patch "/api/friendships/#{friendship.id}/accept"

#     # Assert
#     assert_response 403
#     assert_equal(1, Friendship.count)
#     assert_equal(false, Friendship.all.first.is_accepted)
#   end

#   # DELETE

#   test 'when a user rejects a pending friend request, then response is 200' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: false)

#     # Act
#     delete "/api/friendships/#{friendship.id}"

#     # Assert
#     assert_response :success
#     assert_equal(0, Friendship.count)
#   end

#   test 'when a user that requested a friendship tries to delete the friendship, then response is 403' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: false)

#     # Act
#     delete "/api/friendships/#{friendship.id}"

#     # Assert
#     assert_response 403
#     assert_equal(1, Friendship.count)
#   end

#   test 'when any user deletes an accepted friendship, then response is 200' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: true)

#     # Act
#     delete "/api/friendships/#{friendship.id}"

#     # Assert
#     assert_response :success
#     assert_equal(0, Friendship.count)
#   end

#   test 'when the specified friendship does not exist, then response 404' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: true)

#     # Act
#     delete "/api/friendships/#{friendship.id}err"

#     # Assert
#     assert_response 404
#   end

#   test 'when an unauthenticated user attempts to delete a friendship, then response 401' do
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     reset!
#     friendship = Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: true)

#     # Act
#     delete "/api/friendships/#{friendship.id}err"

#     # Assert
#     assert_response 401
#   end

#   test 'when a user tries to delete a friend request or friendship that involves users other than themselves, then response 403' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     reset!
#     create_and_sign_in_user(user_params)
#     friendship = Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: true)

#     # Act
#     delete "/api/friendships/#{friendship.id}"

#     # Assert
#     assert_response 403
#     assert_equal(1, Friendship.count)
#     assert_equal(friendship.id, Friendship.all.first.id)
#   end

#   # GET

#   # test 'when a user tries to retrieve all his friends with no data, then response 200' do
#   #   # Arrange
#   #   user_one = create_and_sign_in_user(user_params)
#   #   reset!
#   #   user_two = create_and_sign_in_user(user_params)
#   #   reset!
#   #   user_three = create_and_sign_in_user(user_params)

#   #   # Act
#   #   get "/api/users/#{user_three.id}/friendships"

#   #   # Assert
#   #   assert_response :success

#   #   res = JSON.parse(@response.body)
#   #   assert_nil(res)
#   #   # assert_equal([], res['friends']['accepted'])
#   #   # assert_equal([], res['friends']['pending'])

#   #   assert_equal(0, Friendship.count)
#   # end

#   test 'when a unauthenticated user tries to retrieve his friends, then response 401' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     reset!
#     user_three = create_and_sign_in_user(user_params)
#     reset!
#     Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: true)
#     Friendship.create!(sender_id: user_one.id, receiver_id: user_three.id, is_accepted: true)

#     # Act
#     get "/api/users/#{user_one.id}/friendships"

#     # Assert
#     assert_response 401
#   end

#   test 'when a user tries to retrieve all his friends and has data' do
#     # Arrange
#     user_one = create_and_sign_in_user(user_params)
#     reset!
#     user_two = create_and_sign_in_user(user_params)
#     reset!
#     user_three = create_and_sign_in_user(user_params)
#     reset!
#     user_four = create_and_sign_in_user(user_params)

#     Friendship.create!(sender_id: user_four.id, receiver_id: user_two.id, is_accepted: true)
#     Friendship.create!(sender_id: user_four.id, receiver_id: user_three.id, is_accepted: true)
#     Friendship.create!(sender_id: user_one.id, receiver_id: user_four.id, is_accepted: false)
#     Friendship.create!(sender_id: user_two.id, receiver_id: user_three.id, is_accepted: true)
#     Friendship.create!(sender_id: user_two.id, receiver_id: user_one.id, is_accepted: true)

#     # Act
#     get "/api/users/#{user_four.id}/friendships"

#     # Assert
#     assert_response :success
#     res = JSON.parse(@response.body)
#     assert_not_nil(res['friends']['accepted'])
#     assert_equal(2, res['friends']['accepted'].length)

#     assert_not_nil(res['friends']['requests'])
#     assert_equal(1, res['friends']['requests'].length)
#     assert_equal(5, Friendship.count)
#   end
# end
