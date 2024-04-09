class Api::PostsController < ApplicationController
  before_action :set_authenticated_user
  before_action :set_user_profile, :ensure_relation, only: %i[create index]

  def index
    # We need to get all the posts of the user's profile page which is not the author
    @posts = @user.profile_posts
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
