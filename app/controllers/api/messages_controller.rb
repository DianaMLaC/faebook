class Api::MessagesController < ApplicationController
  before_action :must_be_authorized
  before_action :set_chat_room

  def index
    @messages = @chat.messages.includes(:sender)
    render :index
  end

  def create
    @message = @chat.messages.new(message_params)
    @message.sender = @authenticated_user

    if @message.save
      Rails.logger.debug "Broadcasting message to messaging_#{@chat.id}"
      ActionCable.server.broadcast "messaging_#{@chat.id}", message: render_message(@message)
      Rails.logger.debug 'Broadcast complete'
      render :show, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def set_chat_room
    @chat = Chat.find(params[:chat_id])
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
