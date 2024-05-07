class Api::IntrosController < ApplicationController
  before_action :must_be_authorized, :set_user_profile

  def create
    intro = Intro.new(intro_params)
    intro.user_id = @user.id
    # intro = @user.intro.new(work: params[:work])

    if intro.save
      render json: { 'intro' => { id: intro.id, work: intro.work, location: intro.location, education: intro.education,
                                  relationship: intro.relationship } }
    else
      render json: { errors: intro.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    intro = Intro.find_by(id: params[:id])
    intro.update(intro_params)
    if intro.save
      render json: { 'intro' => { id: intro.id, work: intro.work, location: intro.location, education: intro.education,
                                  relationship: intro.relationship } }
    else
      render json: { errors: intro.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user_profile
    @user = User.find(params[:user_id])
  end

  def intro_params
    params.require(:intro).permit(:work, :location, :education, :relationship)
  end
end
