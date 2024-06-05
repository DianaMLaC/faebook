class Api::FriendshipsController < ApplicationController
  before_action :must_be_authorized
  skip_before_action :verify_authenticity_token

  def index
    friend = User.find_by(id: params[:user_id])
    friendship = find_friendship(friend, @authenticated_user)

    @accepted_friendships = friend.sent_friendships.where(is_accepted: true) +
                            friend.received_friendships.where(is_accepted: true)
    @pending_friendships = friend.received_friendships.where(is_accepted: false)

    render json: {
      'friendships' => {
        'accepted' => accepted_friendships,
        'pending' => pending_friendships
      },
      'existing_relation' => friendship
    }, status: 200
  end

  def create
    receiver = User.find_by(id: params[:user_id])
    unless receiver
      render json: {
        'errors' => {
          'friendship' => 'No such user exists'
        }
      }, status: 404 and return
    end

    return unless ensure_no_existing_friendship(receiver, @authenticated_user)

    friendship = Friendship.new(receiver_id: receiver.id, sender_id: @authenticated_user.id)
    if friendship.save
      render json: { 'friendship' => friendship.is_accepted }, status: 200
    else
      render json: { errors: friendship.errors.full_messages }, status: 422
    end
  end

  def accept
    friendship = Friendship.find_by(id: params[:id])
    if friendship.nil?
      render json: {}, status: 404
      return
    end

    return unless ensure_user_is_receiver(friendship)

    if friendship.is_accepted
      render json: {
        'errors' => {
          'friendship' => 'Friendship already pending/accepted'
        }
      }, status: 422 and return
    end

    friendship.is_accepted = true
    if friendship.save
      render json: { 'friendship' => friendship.is_accepted }, status: 200
    else
      render json: { errors: friendship.errors.full_messages }, status: 422
    end
  end

  def destroy
    friendship = Friendship.find_by(id: params[:id])
    if friendship.nil?
      render json: {}, status: 404
      return
    end

    if friendship.is_accepted && friendship.sender_id == @authenticated_user.id
      friendship.delete
      render json: {}, status: 200 and return
    end

    return unless ensure_user_is_receiver(friendship)

    friendship.delete
    render json: {}, status: 200
  end

  # def set_authenticated_user
  #   @authenticated_user = User.find_by(session_token: session[:auth_token])
  #   return unless @authenticated_user.nil?

  #   # we'll redirect to log in page instead of errors.
  #   render json: {
  #     'errors' => {
  #       'authentication' => 'Unauthorized! User need to sign in/ log in'
  #     }
  #   }, status: 401
  # end

  def ensure_no_existing_friendship(receiver, sender)
    existing_relation =
      Friendship.find_by(receiver_id: receiver.id, sender_id: sender.id) ||
      Friendship.find_by(receiver_id: sender.id, sender_id: receiver.id)

    if existing_relation
      render json: { 'errors' => { 'friendship' => 'Friendship already pending/accepted' } },
             status: 403 and return false
    end

    true
  end

  def ensure_user_is_receiver(friendship)
    unless @authenticated_user.id == friendship.receiver_id
      render json: { 'errors' => { 'friendship' => 'Forbidden! Only receiver can delete/accept the friendship' } },
             status: 403 and return false
    end

    true
  end

  def find_friendship(profile_user, auth_user)
    friendship = Friendship.find_by(receiver_id: profile_user.id,
                                    sender_id: auth_user.id) || Friendship.find_by(
                                      receiver_id: auth_user.id, sender_id: profile_user.id
                                    )
    return nil unless friendship

    {
      'friendship_accepted' => friendship.is_accepted
    }
  end
end
