class Api::LikesController < ApplicationController
  before_action :must_be_authorized, :post_must_exist

  def index
    @likes = @post.likes
    render json: { 'likes' => [] } if @likes.nil?

    render :index
  end

  def create
    liker_obj = User.find_by(session_token: session[:auth_token])
    like = Like.find_by(liker_id: liker_obj.id, likeable_id: params[:post_id])
    if like.present?
      render json: {
        'errors' => {
          'like' => 'User already liked this'
        }
      }, status: 422
      return
    end

    @like = @post.likes.new

    user_logged = User.find_by(session_token: session[:auth_token])
    @like.liker_id = user_logged.id

    if @like.save
      render :create

    else
      render json: {}, status: 422
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    liker_obj = User.find_by(session_token: session[:auth_token])

    if @like && @like.liker_id == liker_obj.id
      @like.destroy
      render json: {}, status: 200
    else
      render json: {
        'errors' => {
          'like' => 'Like by this user not found'
        }
      }, status: 404
    end
  end

  private

  def must_be_authorized
    return unless User.find_by(session_token: session[:auth_token]).nil?

    # we'll redirect to log in page instead of errors.
    render json: {
      'errors' => {
        'authentication' => 'Unauthorized! User need to sign in/ log in'
      }
    }, status: 401
  end

  def post_must_exist
    @post = Post.find_by(id: params[:post_id])

    return unless @post.nil?

    render json: {
      'errors' => {
        'posts' => 'Post not found'
      }
    }, status: 404
    nil
  end
end
