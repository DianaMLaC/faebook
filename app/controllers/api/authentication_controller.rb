class Api::AuthenticationController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])

    if @user && @user.has_password?(params[:password])
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
end
