class MessagingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messenger_chat_#{params[:chat_id]}"
    # chat = Chat.find(params[:chat_id])
    # stream_for chat
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # stop_all_streams
  end

  # def received(data)
  #   # logic to save the message and broadcast it further
  #   # we handle the saving of the message to  db in Messaging Controller #create POST
  # end

  # def speak(data)
  #   chat = Chat.find(data['chat_id'])
  #   message = chat.messages.create!(body: data['message'], sender_id: data['sender_id'])
  #   rendered_message = render_message(message)

  #   # Debugging output
  #   puts "Broadcasting to chat: #{chat.id}, message: #{rendered_message}"

  #   MessagingChannel.broadcast_to(chat, message: rendered_message)
  # end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'api/messages/message', locals: { message: }, formats: [:json])
  end
end
