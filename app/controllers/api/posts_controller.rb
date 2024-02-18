class Api::PostsController < ApplicationController
  def create
    post = Post.new(text: params[:text], author_id: params[:author])
    if post.save
      author = User.find_by(id: post.author_id)
      full_name = author.first_name + ' ' + author.last_name

      # render :create
      # render json: { 'firstName' => user.first_name, 'lastName' => user.last_name, 'userId' => user.id }, status: 200
      render json: { 'id' => post.id, 'text' => post.text, 'author' => { 'id' => author.id, 'fullName' => full_name } }
    else
      render :errors, status: 422
    end
  end
end
