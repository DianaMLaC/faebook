class Api::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  before_action :resize_before_save, only: [:create]
  def create
    album = find_or_create_album
    photo = album.photos.build(photo_params)

    if photo.save
      album.update(cover_photo_url: url_for(photo.image))
      render json: { id: photo.id, albumName: album.name, url: url_for(photo.image) }, status: :created
    else
      render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:description, :image)
  end

  def find_or_create_album
    album_name = params[:photo][:album_name] || 'Default'
    @authenticated_user.albums.find_by(name: album_name) || @authenticated_user.albums.create(name: album_name)
  end

  def resize_before_save
    return unless params[:photo][:album_name] == 'Profile' && photo_params[:image]

    begin
      ImageProcessing::MiniMagick
        .source(photo_params[:image])
        .resize_to_fit(130, 130)
        .call(destination: photo_params[:image].tempfile.path)
    rescue StandardError => _e
    end
  end
end
