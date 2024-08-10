class Api::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :must_be_authorized
  before_action :set_chat_room

  def index
    @messages = @chat.messages.includes(:sender).order(created_at: :asc)
    render :index
  end

  def create
    @message = @chat.messages.new(message_params)
    @message.sender = User.find_by(id: params[:message][:sender_id])

    if @message.save
      data = {
        'id' => @message.id,
        'senderId' => @message.sender.id,
        'body' => @message.body,
        'chatId' => @message.chat_id,
        'createdAt' => @message.created_at
      }
      # rendered_message = render_message(@message)
      ActionCable.server.broadcast("messenger_chat_#{@message.chat_id}", data)
      # MessagingChannel.broadcast_to(@chat, message: rendered_message)
      render :show, status:
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def set_chat_room
    @chat = Chat.find(params[:chat_id])
    unless @chat
      render json: {
        'errors' => {
          'chat' => 'No such chat exists'
        }
      }, status: 404 and return false
    end

    true
  end

  def message_params
    params.require(:message).permit(:body, :sender_id, :chat_id)
  end

  def render_message(message)
    ApplicationController.renderer.render(
      partial: 'api/messages/message',
      locals: { message: }
    )
  end
end
