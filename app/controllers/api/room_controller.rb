class Api::RoomController < ApplicationController
  before_action :set_room, only: %i[show update destroy]

  def index
    @rooms = Room.all
    render :index
  end

  def show
    render :show
  end

  def create
    @room = Room.new(room_params)

    if @room.save
      render :show, status: :created
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  def update
    if @room.update(room_params)
      render :show
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @room.destroy
    head :no_content
  end

  private

  def set_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:description)
  end
end
