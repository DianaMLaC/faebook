class Api::PostsController < ApplicationController
  def create
    @user = User.find(params[:author])
    @post = @user.posts.new(text: params[:text])
    if @post.save

      render :create
      # render json: { 'firstName' => user.first_name, 'lastName' => user.last_name, 'userId' => user.id }, status: 200
      # render json: { 'id' => post.id, 'text' => post.text, 'createdAt' => post.created_at,
      #                'author' => { 'id' => user.id, 'displayName' => user.display_name } }
    else
      render :errors, status: 422
    end
  end
end
