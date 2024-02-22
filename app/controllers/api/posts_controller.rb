class Api::PostsController < ApplicationController
  before_action :set_user_profile, only: %i[create index]
  before_action :must_be_authorized

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
    @post.author_id = User.find_by(session_token: session[:auth_token]).id

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

  def must_be_authorized
    return unless User.find_by(session_token: session[:auth_token]).nil?

    # we'll redirect to log in page instead of errors.
    render json: {
      'errors' => {
        'authentication' => 'Unauthorized! User need to sign in/ log in'
      }
    }, status: 401
  end
end
