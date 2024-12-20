class Api::PostsController < ApplicationController
  before_action :must_be_authorized
  before_action :set_user_profile, only: %i[create index]
  before_action :ensure_relation, only: %i[create]

  def index
    @posts = @user.profile_posts.includes(:content, :likes, comments: { replies: :likes }).order(created_at: :desc)

    if @posts.empty?
      render json: { 'posts' => [] }, status: 200
    else
      render :index
    end
  end

  def create
    @post = @user.profile_posts.new(post_params)
    @post.author_id = @authenticated_user.id

    if @post.save
      set_post_content if @post.content_type.present?
      render :create
    else
      render json: { errors: @post.errors.messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.delete
    render json: { 'posts' => 'post deleted' }, status: 200
  end

  private

  def post_params
    params.require(:post).permit(:body, :content_id, :content_type)
  end

  def set_post_content
    @post.content = @post.content_type.constantize.find(@post.content_id) if @post.content_type.present?
  end

  def set_user_profile
    @user = User.find(params[:user_id])
  end

  # def ensure_relation
  #   existing_relation = Friendship.find_by(receiver_id: @authenticated_user.id, sender_id: @user.id,
  #                                          is_accepted: true) ||
  #                       Friendship.find_by(receiver_id: @user.id, sender_id: @authenticated_user.id,
  #                                          is_accepted: true)

  #   return if @authenticated_user.id == @user.id || existing_relation.present?

  #   render json: {
  #     'errors' => {
  #       'friendship' => 'No relation between users'
  #     }
  #   }, status: 422 and false
  # end

  def ensure_relation
    existing_relation = Friendship.find_by(receiver_id: @authenticated_user.id, sender_id: @user.id,
                                           is_accepted: true) ||
                        Friendship.find_by(receiver_id: @user.id, sender_id: @authenticated_user.id, is_accepted: true)

    return if @authenticated_user.id == @user.id || existing_relation.present?

    @user.errors.add(:friendship, 'No relation between users')
    render json: { errors: @user.errors.messages }, status: :unprocessable_entity and return
  end
end
