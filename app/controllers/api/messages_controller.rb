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
    @message.sender = User.find_by(id: params[:sender_id])

    if @message.save
      rendered_message = render_message(@message)
      MessagingChannel.broadcast_to(@chat, message: rendered_message)
      render :show, status: :created
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
    params.require(:message).permit(:body)
  end

  def render_message(message)
    ApplicationController.renderer.render(
      partial: 'api/messages/message',
      locals: { message: }
    )
  end
end
