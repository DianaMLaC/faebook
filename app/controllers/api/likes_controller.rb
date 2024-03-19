class Api::LikesController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    if post.nil?
      render json: {
        'errors' => {
          'authentication' => 'Unauthorized! User need to sign in/ log in'
        }
      }, status: 401
      return
    end

    like = Like.new(post_id: params[:post_id],
                    liker_id: post.author_id)

    if like.save
      render json: { 'id' => like.id,
                     'postId' => like.post_id,
                     'liker' => {
                       'id' => like.liker_id,
                       'displayName' => post.author.display_name
                     } }, status: 200
    else
      render json: {}, status: 422
    end
  end
end
