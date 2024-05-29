class Api::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized, :post_must_exist, :ensure_relation

  def index
    @comments = @post.comments.includes(:likes, replies: :likes).where(parent_comment_id: nil).order(created_at: :desc)
    if @comments.empty?
      render json: { 'comments' => [] }
      return
    end

    render :index
  end

  def create
    @comment = @post.comments.new(comment_params)
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

  def post_must_exist
    @post = Post.find(params[:post_id])

    return unless @post.nil?

    render json: {
      'errors' => {
        'posts' => 'Post not found'
      }
    }, status: 404
    nil
  end

  def ensure_relation
    existing_relation = Friendship.find_by(receiver_id: @authenticated_user.id, sender_id: @post.profile_id,
                                           is_accepted: true) ||
                        Friendship.find_by(receiver_id: @post.profile_id, sender_id: @authenticated_user.id,
                                           is_accepted: true)

    return if @authenticated_user.id == @post.profile_id || existing_relation.present?

    render json: {
      'errors' => {
        'friendship' => 'No relation between users'
      }
    }, status: 422 and false
  end
end
