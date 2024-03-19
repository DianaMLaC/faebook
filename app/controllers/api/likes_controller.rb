class Api::LikesController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    render json: {
      id: SecureRandom.uuid,
      postId: params[:post_id],
      liker: {
        id: post.author_id,
        displayName: post.author.display_name
      }
    }, status: 200
  end
end
