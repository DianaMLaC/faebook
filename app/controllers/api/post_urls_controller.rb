class Api::PostUrlsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized

  def create
    @post_url = find_or_create_url
    if @post_url
      render :create
    else
      render json: @post_url.errors, status: 422
    end
  end

  def show
    post_url = PostUrl.find(params[:id])
    if post_url
      render :show
    else
      render json: post_url.errors, status: 401
    end
  end

  def get_api_key
    api_key = Rails.application.credentials.dig(:link_preview_api_key)
    debugger
    render json: { link_preview_api_key: api_key }
  end

  private

  def find_or_create_url
    post_url = PostUrl.find_by(url: params[:url])

    post_url ||= PostUrl.create(url_params)

    post_url
  end

  def url_params
    params.require(:post_url).permit(:title, :description, :image, :url)
  end
end
