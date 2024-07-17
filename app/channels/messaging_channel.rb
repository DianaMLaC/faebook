class MessagingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messaging_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    room = Room.find(data['room_id'])
    message = room.messages.create!(body: data['message'], sender_id: data['sender_id'])
    ActionCable.server.broadcast "messaging_#{room.id}", message: render_message(message)
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: })
  end
end
