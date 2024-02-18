class Api::PostsController < ApplicationController
  def create
    user = User.find(params[:author])
    post = user.posts.new(text: params[:text])
    if post.save
      full_name = user.first_name + ' ' + user.last_name

      # render :create
      # render json: { 'firstName' => user.first_name, 'lastName' => user.last_name, 'userId' => user.id }, status: 200
      render json: { 'id' => post.id, 'text' => post.text, 'author' => { 'id' => user.id, 'fullName' => full_name } }
    else
      render :errors, status: 422
    end
  end
end
