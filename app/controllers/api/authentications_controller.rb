class Api::AuthenticationsController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    @user = User.find_by(email: params[:email])
    debugger
    if @user && @user.authenticate_with_error(params[:password])
      # @user.update!(session_token: SecureRandom.urlsafe_base64(16)) # Regenerate token on login
      session[:auth_token] = @user.session_token
      render :create
    else

      render json: { errors: @user&.errors&.messages || { base: ['Email and password combination is invalid'] } },
             status: 422
    end
  end

  def destroy
    session[:auth_token] = nil
    reset_session
    render json: {}, status: 200
  end
end
