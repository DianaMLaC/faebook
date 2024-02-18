class Api::PostsController < ApplicationController
  def create
    @post = Post.new(text: params[:text])
    if @post.save
      render :create
    else
      render :errors, status: 422
    end
  end
end
