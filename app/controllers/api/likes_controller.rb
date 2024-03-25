class Api::LikesController < ApplicationController
  before_action :must_be_authorized, :set_likeable

  def index
    @likes = @likeable.likes
    render json: { 'likes' => [] } if @likes.nil?

    render :index
  end

  def create
    liker_obj = User.find_by(session_token: session[:auth_token])

    like = Like.find_by(liker_id: liker_obj.id, likeable_id: @likeable.id)
    if like.present?
      render json: {
        'errors' => {
          'like' => 'User already liked this'
        }
      }, status: 422
      return
    end

    @like = @likeable.likes.new

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

  def set_likeable
    likeable_types = {
      'post_id' => Post,
      'comment_id' => Comment
      # Add more mappings here as your application grows
    }

    likeable_type = likeable_types.find { |param_key, _class| params[param_key].present? }
    if likeable_type
      @likeable = likeable_type[1].find_by(id: params[likeable_type[0]])
      unless @likeable
        render json: { 'errors' => { 'likes' => "#{likeable_type[1].name} not found" } }, status: 404
        nil
      end
    else
      render json: { 'errors' => { 'likes' => 'Likeable type not found' } }, status: 404
    end
  end
end
