class Api::PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized, :set_user_profile
  before_action :ensure_relation, only: %i[create]

  def index
    @posts = @user.profile_posts.includes(:likes, :content, comments: { replies: :likes }).order(created_at: :desc)

    if @posts.empty?
      render json: { 'posts' => [] }
    else
      render :index
    end
  end

  def create
    @post = @user.profile_posts.new(post_params)
    @post.author_id = @authenticated_user.id

    if @post.save
      render :create
    else
      render json: @post.errors, status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:body, :content_id, :content_type)
  end

  def set_user_profile
    @user = User.find_by(id: params[:user_id])
  end

  def ensure_relation
    existing_relation = Friendship.find_by(receiver_id: @authenticated_user.id, sender_id: @user.id,
                                           is_accepted: true) ||
                        Friendship.find_by(receiver_id: @user.id, sender_id: @authenticated_user.id,
                                           is_accepted: true)

    return if @authenticated_user.id == @user.id || existing_relation.present?

    render json: {
      'errors' => {
        'friendship' => 'No relation between users'
      }
    }, status: 422 and false
  end
end
