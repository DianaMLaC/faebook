class Api::PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  before_action :set_user_profile, :ensure_relation, only: %i[create index]

  def index
    @posts = @user.profile_posts.includes(:likes).order(created_at: :desc)

    if @posts.nil?
      render json: { 'posts' => [] }
    else
      render :index
    end
  end

  def create
    @post = @user.profile_posts.new(body: params[:body])
    @post.author_id = @authenticated_user.id

    if @post.save
      render :create
    else
      render json: @post.errors, status: 422
    end
  end

  private

  def set_user_profile
    @user = User.find(params[:user_id])
  end

  def ensure_relation
    existing_relation = Friendship.find_by(receiver_id: @authenticated_user.id, sender_id: @user.id,
                                           is_accepted: true) ||
                        Friendship.find_by(receiver_id: @user.id, sender_id: @authenticated_user.id,
                                           is_accepted: true)

    return unless @authenticated_user.id != @user.id && existing_relation.nil?

    render json: {
      'errors' => {
        'friendship' => 'No relation between users'
      }
    }, status: 422 and false
  end
end
