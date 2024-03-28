class Api::FriendshipsController < ApplicationController
  def create
    # receiver
    receiver = User.find(params[:user_id])

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
    existing_relation =
      Friendship.find_by(receiver_id: receiver.id, sender_id: authenticated_user.id) ||
      Friendship.find_by(receiver_id: authenticated_user.id, sender_id: receiver.id)

    if existing_relation
      render json: {
        'errors' => {
          'friendship' => 'Friendship already pending/accepted'
        }
      }, status: 403 and return
    end

    friendship = Friendship.new(receiver_id: receiver.id, sender_id: authenticated_user.id)
    if friendship.save
      render json: { 'friendship' => friendship.is_accepted }, status: 200
    else
      render json: { errors: friendship.errors.full_messages }, status: 422
    end
  end

  def accept
    render json: {}, status: 200
  end
end
