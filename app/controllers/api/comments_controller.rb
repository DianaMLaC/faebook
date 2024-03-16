class Api::CommentsController < ApplicationController
  before_action :must_be_authorized

  def create
    post = Post.find(params[:post_id])
    if post.nil?
      render json: {
        'errors' => {
          'posts' => 'Post not found'
        }
      }, status: 404
    end
    comment = post.comments.new(text: params[:text])
    comment.author_id = User.find_by(session_token: session[:auth_token]).id

    if comment.save!
      render json: {
        'id' => comment.id,
        'text' => comment.text,
        'createdAt' => comment.created_at,
        'postId' => comment.post_id,
        'author' => {
          'id' => comment.author_id,
          'displayName' => comment.author.display_name
        }
      }
    else
      render json: {
        'errors' => {
          'authentication' => 'Unauthorized! User need to sign in/ log in'
        }
      }, status: 401
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
