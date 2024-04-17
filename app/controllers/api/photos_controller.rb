class Api::PhotosController < ApplicationController
  before_action :must_be_authorized
  def create
    album = @authenticated_user.profile_photo_album || @authenticated_user.albums.create!(name: 'Profile')

    if album.nil?
      render json: { error: 'Album not found' }, status: :not_found
      return
    end

    photo = album.photos.new(description: params[:description], image: params[:image])
    return unless photo.save!

    render json: photo, status: 200
  end
end
