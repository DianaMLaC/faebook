class Api::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  before_action :set_commentable, only: %i[index create]
  before_action :ensure_relation, only: [:create]

  def index
    @comments = @commentable.comments.includes(:likes,
                                               replies: :likes).where(parent_comment_id: nil).order(created_at: :desc)
    if @comments.empty?
      render json: { 'comments' => [] }
      return
    end

    render :index
  end

  def create
    @comment = @commentable.comments.new(comment_params)
    @comment.author_id = @authenticated_user.id

    if @comment.save
      render :create
    else
      mapped_errors = {
        text: @comment.errors.where(:text).map(&:full_message).join(', '),
        parentCommentId: @comment.errors.where(:parent_comment_id).map(&:full_message).join(', ')
      }
      render json: {
        errors: {
          comment: omit_empty_strings(mapped_errors)
        }
      }, status: 422
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :parent_comment_id)
  end

  def set_commentable
    if params[:post_id]
      @commentable = Post.find(params[:post_id])
    elsif params[:photo_id]
      @commentable = Photo.find(params[:photo_id])
    else
      render json: { errors: { commentable: 'Not found' } }, status: 404
    end
  end

  def ensure_relation
    profile_id = if @commentable.is_a?(Post)
                   @commentable.profile_id
                 elsif @commentable.is_a?(Photo)
                   @commentable.user_id # Adjust as necessary
                 end

    existing_relation = Friendship.find_by(receiver_id: @authenticated_user.id, sender_id: profile_id,
                                           is_accepted: true) ||
                        Friendship.find_by(receiver_id: profile_id, sender_id: @authenticated_user.id,
                                           is_accepted: true)

    return if @authenticated_user.id == profile_id || existing_relation.present?

    render json: {
      errors: {
        friendship: 'No relation between users'
      }
    }, status: 422 and false
  end
end
