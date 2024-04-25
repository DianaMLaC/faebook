class Api::AuthenticationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.find_by(email: params[:email])
    Rails.logger.debug "Attempting to authenticate user with email: #{params[:email]}"

    if @user && @user.has_password?(params[:password])
      Rails.logger.debug "User found with email: #{params[:email]}"
      session[:auth_token] = @user.session_token
      # render json: { 'firstName' => user.first_name, 'lastName' => user.last_name, 'userId' => user.id }, status: 200
      render :create

    else

      render json: {
        'errors' => {
          'authentication' => 'Email and/or password are invalid'
        }
      }, status: 422
    end
  end

  def destroy
    session[:auth_token] = nil
    render json: {}, status: 200
  end
end
