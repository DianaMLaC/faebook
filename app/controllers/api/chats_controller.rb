class Api::ChatsController < ApplicationController
  before_action :must_be_authorized
  before_action :set_chat_room, only: %i[show update destroy]

  def index
    @chats = Chat.all
    render :index
  end

  def show
    render :show
  end

  def create
    @chat = Chat.new(chat_params)
    # debugger
    if @chat.save
      render :show, status: :created
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  def update
    if @chat.update(chat_params)
      render :show
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @chat.destroy
    head :no_content
  end

  private

  def set_chat_room
    @chat = Chat.find(params[:id])
  end

  def chat_params
    params.require(:chat).permit(:name)
  end
end
