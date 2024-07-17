class MessagingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messaging_#{params[:chat_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    chat = Chat.find(data['chat_id'])
    message = chat.messages.create!(body: data['message'], sender_id: data['sender_id'])
    rendered_message = render_message(message)

    # Debugging output
    puts "Broadcasting to chat: #{chat.id}, message: #{rendered_message}"

    MessagingChannel.broadcast_to(chat, message: rendered_message)
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'api/messages/message', locals: { message: }, formats: [:json])
  end
end
