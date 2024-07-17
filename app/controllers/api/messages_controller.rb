class Api::MessagesController < ApplicationController
  before_action :must_be_authorized
  before_action :set_room

  def index
    @messages = @room.messages.includes(:sender)
    render :index
  end

  def create
    @message = @room.messages.new(message_params)
    @message.sender = @authenticated_user

    if @message.save
      ActionCable.server.broadcast "messaging_#{@room.id}", message: render_message(@message)
      render :show, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def set_room
    @room = Room.find(params[:room_id])
  end

  def message_params
    params.require(:message).permit(:body)
  end

  def render_message(message)
    ApplicationController.renderer.render(
      partial: 'messages/message',
      locals: { message: }
    )
  end
end
