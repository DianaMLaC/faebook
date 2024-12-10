class Api::PostUrlsController < ApplicationController
  before_action :must_be_authorized

  def create
    @post_url = find_or_create_url
    if @post_url.persisted?
      render :create
    else
      render json: { errors: @post_url.errors.messages }, status: :unprocessable_entity
    end
  end

  def show
    post_url = PostUrl.find(params[:id])
    render :show
  end

  def get_api_key
    api_key = Rails.application.credentials[:link_preview_api_key]
    render json: { link_preview_api_key: api_key }
  end

  private

  def find_or_create_url
    post_url = PostUrl.find_by(url: params[:url])

    post_url ||= PostUrl.create!(url_params)

    post_url
  end

  def url_params
    params.require(:post_url).permit(:title, :description, :image, :url)
  end
end
