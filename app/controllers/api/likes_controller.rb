class Api::LikesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized, :set_likeable

  def index
    @likes = @likeable.likes
    render json: { 'likes' => [] } if @likes.nil?
    render :index
  end

  def toggle_like
    existing_like = Like.find_by(liker_id: @authenticated_user.id, likeable_id: @likeable.id)

    if existing_like
      existing_like.destroy
      render json: { 'id' => existing_like.id }, status: 200
    else
      @like = @likeable.likes.new(liker_id: @authenticated_user.id)

      if @like.save
        render :create
      else
        render json: { errors: @like.errors.messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def set_likeable
    likeable_types = {
      'post_id' => Post,
      'comment_id' => Comment,
      'photo_id' => Photo
    }

    likeable_type = likeable_types.find { |param_key, _class| params[param_key].present? }
    if likeable_type
      @likeable = likeable_type[1].find_by(id: params[likeable_type[0]])
      unless @likeable
        render json: { errors: { likeable_type[1].name.downcase => ["#{likeable_type[1].name} not found"] } }, status: :not_found and return
      end
    else
      render json: { errors: { base: ['Likeable type not found'] } }, status: :not_found and return
    end
end
