class Api::CommentsController < ApplicationController
  before_action :set_authenticated_user, :post_must_exist

  def index
    @comments = @post.comments.where(parent_comment_id: nil)
    render json: { 'comments' => [] } if @comments.nil?

    render :index
  end

  def create
    existing_relation = Friendship.find_by(receiver_id: @authenticated_user.id, sender_id: @post.profile_id,
                                           is_accepted: true) ||
                        Friendship.find_by(receiver_id: @post.profile_id, sender_id: @authenticated_user.id,
                                           is_accepted: true)

    if @authenticated_user.id != @post.profile_id && existing_relation.nil?
      render json: {
        'errors' => {
          'friendship' => 'No relation between users'
        }
      }, status: 422 and return
    end

    @comment = @post.comments.new(text: params[:text])
    @comment.author_id = @authenticated_user.id
    @comment.parent_comment_id = params[:parent_comment_id]

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

  def set_authenticated_user
    @authenticated_user = User.find_by(session_token: session[:auth_token])
    return unless @authenticated_user.nil?

    # we'll redirect to log in page instead of errors.
    render json: {
      'errors' => {
        'authentication' => 'Unauthorized! User need to sign in/ log in'
      }
    }, status: 401
  end
end
