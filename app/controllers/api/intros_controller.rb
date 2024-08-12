class Api::IntrosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized, :set_user_profile

  def create
    @intro = Intro.new(intro_params)
    @intro.user_id = @authenticated_user.id
    if @intro.save
      render :create
    else
      render json: { errors: intro.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    @intro = Intro.find(params[:id])
    @intro.update(intro_params)
    if @intro.save
      render :update
    else
      render json: { errors: @intro.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user_profile
    @user = User.find(params[:user_id])
  end

  def intro_params
    params.require(:intro).permit(:order, :location, :education, :house, :elements, :zodiac, :bio)
  end
end
