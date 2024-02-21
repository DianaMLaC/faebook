class Api::PostsController < ApplicationController
  before_action :set_user_profile, only: %i[create index]
  before_action :require_authentication

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
    @post = @user.profile_posts.new(text: params[:text])
    @post.author_id = current_user.id

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
end
