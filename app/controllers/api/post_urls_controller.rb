class Api::PostUrlsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  def create
    @post_url = PostUrl.new(url_params)
    if @post_url.save
      render :create
    else
      render json: @post_url.errors, status: 422
    end
  end

  def show
    @post_url = PostUrl.find(params[:id])
    if @post_url
      render :show
    else
      render json: @post_url.errors, status: 401
    end
  end

  private

  def url_params
    params.require(:post_url).permit(:title, :description, :image, :url)
  end
end
