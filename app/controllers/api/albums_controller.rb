class Api::AlbumsController < ApplicationController
  # before_action :must_be_authorized
  def index
    # Rails.logger.debug 'params[:user_id]:'
    @albums = Album.includes(:photos).where(user_id: params[:user_id])
    if @albums
      render :index
    else
      render json: { 'albums' => [] }
    end
  end

  def show
    @album = Album.includes(:photos).find_by(user_id: params[:user_id], id: params[:id])
    if @album
      render :show
    else
      render json: { 'albums' => 'Album not found' }, status: 404
    end
  end
end
