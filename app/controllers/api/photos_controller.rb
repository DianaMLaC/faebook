class Api::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  before_action lambda {
    resize_before_save(photo_params[:image], 130, 130)
  }, only: [:create]
  def create
    album = @authenticated_user.albums.find_by(name: 'Profile') || @authenticated_user.albums.create(name: 'Profile')
    photo = album.photos.create(photo_params)

    if photo.save
      render json: { id: photo.id, description: photo.description, url: url_for(photo.image) }, status: :created
    else
      render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:description, :image)
  end

  def resize_before_save(image_param, width, height)
    return unless image_param

    begin
      ImageProcessing::MiniMagick
        .source(image_param)
        .resize_to_fit(width, height)
        .call(destination: image_param.tempfile.path)
    rescue StandardError => _e
    end
  end
end
