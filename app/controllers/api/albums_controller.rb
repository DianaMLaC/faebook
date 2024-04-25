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
end
