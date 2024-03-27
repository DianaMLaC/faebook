class Api::FriendshipsController < ApplicationController
  def create
    # receiver
    receiver = User.find_by(id: params[:user_id])
    # sender
    authenticated_user = User.find_by(session_token: session[:auth_token])

    if authenticated_user.nil?

      render json: {
        'errors' => {
          'authentication' => 'Unauthorized! User need to sign in/ log in'
        }
      }, status: 401 and return
      # return
    end

    # friendship
    friendship = Friendship.new(receiver_id: receiver.id, sender_id: authenticated_user.id)
    if friendship.save
      render json: { 'friendship' => friendship.is_accepted }, status: 200
    else
      render json: {}, status: 422
    end
  end
end
