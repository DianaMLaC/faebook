class Api::LikesController < ApplicationController
  before_action :must_be_authorized

  def index
    # check if the post exists
    @post = Post.find(params[:post_id])
    if @post.nil?
      render json: {
        'errors' => {
          'posts' => 'Post not found'
        }
      }, status: 404

      return
    end
    @likes = @post.likes
    render json: { 'likes' => [] } if @likes.nil?

    render :index
  end

  def create
    # check if like already exists

    # find like with .find_sole_by
    # like = Like.find_sole_by(
    #   post_id: params[:post_id],
    #   liker_id: params[:liker_id]
    # ) ----- it fails other tests!!!

    liker_obj = User.find_by(session_token: session[:auth_token])
    like = Like.find_by(liker_id: liker_obj.id, post_id: params[:post_id])
    if like.present?
      render json: {
        'errors' => {
          'like' => 'User already liked this'
        }
      }, status: 422
      return
    end

    # check if the post exists
    @post = Post.find(params[:post_id])
    if @post.nil?
      render json: {
        'errors' => {
          'posts' => 'Post not found'
        }
      }, status: 404

      return
    end

    @like = @post.likes.new

    # set the authenticated user as the liker
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
end
