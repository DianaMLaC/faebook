class Api::PostsController < ApplicationController
  def create
    @user = User.find(params[:author])

    if @user.session_token != session[:auth_token]
      render json: {}, status: 401
      return
    end

    @post = @user.posts.new(text: params[:text])
    if @post.save
      render :create
    else
      render :errors, status: 422
    end
  end
end
