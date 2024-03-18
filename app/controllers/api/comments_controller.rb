class Api::CommentsController < ApplicationController
  before_action :must_be_authorized, :post_must_exist

  def index
    @comments = @post.comments.where(parent_comment_id: nil)
    render json: { 'comments' => [] } if @comments.nil?

    render :index
  end

  def create
    @comment = @post.comments.new(text: params[:text])
    @comment.author_id = User.find_by(session_token: session[:auth_token]).id
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
