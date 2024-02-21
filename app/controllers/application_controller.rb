class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= User.find_by(session_token: session[:auth_token])
  end

  def require_authentication
    current_user
    return unless @current_user.nil?

    # we'll redirect to log in page instead of errors.
    render json: {
      'errors' => {
        'authentication' => 'Unauthorized! User need to sign in/ log in'
      }
    }, status: 401
  end
end
