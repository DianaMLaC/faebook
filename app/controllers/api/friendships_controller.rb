class Api::FriendshipsController < ApplicationController
  before_action :must_be_authorized
  before_action :set_friendship, only: %i[accept destroy]

  skip_before_action :verify_authenticity_token

  def index
    profile_user = User.find_by(id: params[:user_id])
    @existing_relation = find_friendship(profile_user, @authenticated_user)

    accepted_friendships = Friendship.includes(:sender, :receiver)
                                     .where('(sender_id = :user_id OR receiver_id = :user_id) AND is_accepted = true', user_id: profile_user.id)
                                     .order(created_at: :desc)

    @friendships = accepted_friendships.map do |friendship|
      if friendship.sender_id == profile_user.id
        { user: friendship.receiver, friendship_id: friendship.id, friendship_status: friendship.is_accepted }
      else
        { user: friendship.sender, friendship_id: friendship.id, friendship_status: friendship.is_accepted }
      end
    end.compact

    friend_requests = profile_user.received_friendships.where(is_accepted: false)
    @pending_friendships = friend_requests.map do |friendship|
      if friendship.sender_id == profile_user.id
        { user: friendship.receiver, friendship_id: friendship.id, friendship_status: friendship.is_accepted }
      else
        { user: friendship.sender, friendship_id: friendship.id, friendship_status: friendship.is_accepted }
      end
    end.compact

    render :index
  end

  def create
    return unless find_receiver(params[:user_id])
    return unless ensure_no_existing_friendship(@receiver, @authenticated_user)

    @friendship = Friendship.new(receiver_id: @receiver.id, sender_id: @authenticated_user.id)
    if @friendship.save
      render :show
    else
      render json: { errors: @friendship.errors.full_messages }, status: 422
    end
  end

  def accept
    return unless ensure_user_is_receiver(@friendship)
    return unless friendship_pending(@friendship)
    return unless find_receiver(@friendship.receiver_id)

    @friendship.is_accepted = true

    if @friendship.save
      render :show
    else
      render json: { errors: friendship.errors.full_messages }, status: 422
    end
  end

  def destroy
    if @authenticated_user.id == @friendship.sender_id || @authenticated_user.id == @friendship.receiver_id
      @friendship.delete
      render json: { 'friendship' => 'request removed' }, status: 200
    else
      render json: {
        'errors' => {
          'friendship' => 'User Not part of the friendship to delete'
        }
      }, status: 403
    end
  end

  private

  def set_friendship
    @friendship = Friendship.find_by(id: params[:id])
    if @friendship.nil?
      render json: {}, status: 404
      return
    end
    @friendship
  end

  def find_receiver(id)
    @receiver = User.find(id)
    unless @receiver
      render json: {
        'errors' => {
          'friendship' => 'No such user exists'
        }
      }, status: 404 and return false
    end

    true
  end

  def friendship_pending(friendship)
    if friendship.is_accepted
      render json: {
        'errors' => {
          'friendship' => 'Friendship already pending/accepted'
        }
      }, status: 422 and return
    end

    true
  end

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
    return true if @authenticated_user.id == friendship.receiver_id

    render json: { 'errors' => { 'friendship' => 'Forbidden! Only receiver can delete/accept the friendship' } },
           status: 403 and return false
  end

  def find_friendship(profile_user, auth_user)
    return { 'friendship_accepted' => nil } if profile_user.id == auth_user.id

    friendship = Friendship.find_by(receiver_id: profile_user.id, sender_id: auth_user.id) ||
                 Friendship.find_by(receiver_id: auth_user.id, sender_id: profile_user.id)

    friendship || nil
  end
end
