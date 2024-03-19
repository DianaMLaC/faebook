class Api::LikesController < ApplicationController
  def create
    # find the user authenticated
    user_logged = User.find_by(session_token: session[:auth_token])
    if user_logged.nil?
      render json: {
        'errors' => {
          'authentication' => 'Unauthorized! User need to sign in/ log in'
        }
      }, status: 401
      return
    end
    # find the post to create the like from association
    @post = Post.find(params[:post_id])
    if @post.nil?
      render json: {
        'errors' => {
          'posts' => 'Post not found'
        }
      }, status: 404
      return
    end

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

    @like = @post.likes.new
    @like.liker_id = user_logged.id

    if @like.save
      render :create

    else
      render json: {}, status: 422
    end
  end

  def destroy
    user_logged = User.find_by(session_token: session[:auth_token])
    if user_logged.nil?
      render json: {
        'errors' => {
          'authentication' => 'Unauthorized! User need to sign in/ log in'
        }
      }, status: 401
      return
    end

    @like = Like.find(params[:id])
    if @like.nil?
      render json: {
        'errors' => {
          'like' => 'Like not found'
        }
      }, status: 422
      return
    end
    @like.destroy
    render json: {}, status: 200
  end
end
