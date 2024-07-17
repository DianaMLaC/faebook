require 'test_helper'

class MessagingChannelTest < ActionCable::Channel::TestCase
  def user_params
    { first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      date_of_birth: '2000-10-20',
      email: Faker::Internet.email }
  end

  def sign_in(user)
    stub_connection(cookies: { signed: { auth_token: user.session_token } })
  end

  def create_chat
    Chat.create!(name: Faker::Lorem.word)
  end

  test 'subscribes and streams for chat' do
    user = User.create!(user_params)
    sign_in(user)
    chat = create_chat
    subscribe(chat_id: chat.id)

    assert subscription.confirmed?
    assert_has_stream "messaging_#{chat.id}"
  end

  test 'broadcasts message' do
    user = User.create!(user_params)
    sign_in(user)
    chat = create_chat

    subscribe(chat_id: chat.id)

    # Perform the action and check for broadcast on the correct channel
    perform :speak, 'chat_id' => chat.id, 'message' => 'Hello, World!', 'sender_id' => user.id

    # Retrieve the message created during the broadcast
    message = chat.messages.last

    # Generate the expected_message with the actual message object
    expected_message = ApplicationController.renderer.render(partial: 'api/messages/message', locals: { message: },
                                                             formats: [:json])

    # Debugging output
    puts "Expected message: #{expected_message}"

    # Assert broadcast on the correct channel with the expected message
    assert_broadcast_on(MessagingChannel.broadcasting_for(chat), message: expected_message)
  end
  # expected_message = 'Hello world'
end
