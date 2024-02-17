class Api::AuthenticationController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user.nil?
      render json: {
        'errors' => {
          'authentication' => 'Email and/or password are invalid'
        }
      }, status: 422
    else

      render json: { 'firstName' => user.first_name, 'lastName' => user.last_name, 'userId' => user.id }, status: 200
    end
  end
end
