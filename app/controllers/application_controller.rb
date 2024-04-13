class ApplicationController < ActionController::Base
  helper_method :current_user

  def omit_empty_strings(err_obj)
    err_obj.reject { |_k, _v| _v == '' }
  end

  # def current_user
  #   return nil unless session[:session_token]

  #   @current_user ||= User.find_by(session_token: session[:auth_token])
  # end

  def current_user
    @authenticated_user = User.find_by(session_token: session[:auth_token])
    return unless @authenticated_user.nil?

    nil
  end

  def must_be_authorized
    current_user
    return unless @authenticated_user.nil?

    render json: {
      'errors' => {
        'authentication' => 'Unauthorized! User need to sign in/ log in'
      }
    }, status: 401
  end
end
