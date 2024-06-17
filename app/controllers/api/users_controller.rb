class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    @user = User.includes(:intro).find_by(id: params[:id])

    unless @user
      render json: { error: 'User not found' }, status: :not_found
      return
    end

    render :show
  end

  def create
    @user = User.new(user_params)
    debugger
    if @user.save
      session[:auth_token] = @user.session_token
      render :create
    else
      mapped_errors = {
        email: @user.errors.where(:email).map(&:full_message).join(', '),
        firstName: @user.errors.where(:first_name).map(&:full_message).join(', '),
        lastName: @user.errors.where(:last_name).map(&:full_message).join(', '),
        password: @user.errors.where(:password).map(&:full_message).join(', '),
        dateOfBirth: @user.errors.where(:date_of_birth).map(&:full_message).join(', ')
      }

      render json: {
        errors: {
          user: omit_empty_strings(mapped_errors)
        }
      }, status: 422
    end
  end

  def search
    if params[:q].present?
      @users = User.where('first_name ILIKE :q OR last_name ILIKE :q', q: "%#{params[:q]}%")
      render :search
    else
      render json: { error: 'No query provided' }, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :first_name, :last_name, :password, :date_of_birth, :email)
  end
end
