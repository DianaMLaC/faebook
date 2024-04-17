class Api::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  def create
    album = @authenticated_user.albums.find_by(name: 'Profile') || @authenticated_user.albums.create(name: 'Profile')
    photo = album.photos.create(photo_params)

    if photo.save
      render json: { id: photo.id, url: url_for(photo.image) }, status: :created
    else
      render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:description, :image)
  end
end
