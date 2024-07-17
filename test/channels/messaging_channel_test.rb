require 'test_helper'

class MessagingChannelTest < ActionCable::Channel::TestCase
  # test "subscribes" do
  #   subscribe
  #   assert subscription.confirmed?
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

  def message_params
    { body: Faker::Lorem.sentence }
  end

  def create_user(user_info)
    User.create!(first_name: user_info[:firstName],
                 last_name: user_info[:lastName],
                 password: user_info[:password],
                 date_of_birth: user_info[:dateOfBirth],
                 email: user_info[:email])
  end

  def create_room(user)
    Room.create!(description: room_params[:description], user:)
  end

  test 'subscribes and streams for room' do
    # Arrange
    user = create_user(user_params)
    room = create_room(user)

    # Act
    subscribe room_id: room.id

    # Assert
    assert subscription.confirmed?
    assert_has_stream "messaging_#{room.id}"
  end

  test 'broadcasts message to room' do
    # Arrange
    user = create_user(user_params)
    room = create_room(user)
    subscribe room_id: room.id

    # Act
    perform :speak, room_id: room.id, message: message_params[:body], sender_id: user.id

    # Assert
    assert_broadcast_on("messaging_#{room.id}", message: {
                          body: message_params[:body],
                          sender: { id: user.id, first_name: user.first_name, last_name: user.last_name },
                          room_id: room.id
                        })
  end
end
