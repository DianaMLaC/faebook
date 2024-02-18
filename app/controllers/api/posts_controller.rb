class Api::PostsController < ApplicationController
  def create
    post = Post.new(text: params[:text])
    if post.save
      # render :create
      # render json: { 'firstName' => user.first_name, 'lastName' => user.last_name, 'userId' => user.id }, status: 200
      render json: { 'id' => post.id, 'text' => post.text }
    else
      render :errors, status: 422
    end
  end
end
