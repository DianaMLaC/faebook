class Api::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :must_be_authorized
  before_action :set_chat_room

  def index
    @messages = @chat.messages.includes(:sender).order(created_at: :asc)
    if @messages.empty?
      render json: { 'messages' => [] }, status: 200
    else
      render :index
    end
  end

  def create
    @message = @chat.messages.new(message_params)
    @message.sender = User.find(params[:message][:sender_id])

    if @message.save
      data = {
        'id' => @message.id,
        'senderId' => @message.sender.id,
        'body' => @message.body,
        'chatId' => @message.chat_id,
        'createdAt' => @message.created_at
      }
      ActionCable.server.broadcast("messenger_chat_#{@message.chat_id}", data)
      render :show, status:
    else
      render json: { errors: @message.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def set_chat_room
    @chat = Chat.find(params[:chat_id])
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
