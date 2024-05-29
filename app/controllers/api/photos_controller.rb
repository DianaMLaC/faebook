class Api::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  # before_action :resize_before_save, only: [:create]

  def index
    Rails.logger.info 'In PhotosController#index'
    @user = User.find_by(id: params[:user_id])
    @photos = @user.photos.order(created_at: :desc)

    if @photos.empty?
      render json: { 'photos' => [] }
    else
      render :index
    end
  end

  def create
    album = find_or_create_album
    photo = album.photos.build(photo_params)

    if photo.save
      if photo.image.attached?
        photo.update(photo_url: url_for(photo.image))
        photo.save
        album.update(cover_photo_url: url_for(photo.image))
      end
      render json: { id: photo.id, albumName: album.name, url: photo.photo_url }, status: 200
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

  # def resize_image(photo)
  #   return unless photo.image.attached?

  #   processed_image = ImageProcessing::MiniMagick
  #                     .source(photo.image.download)
  #                     .resize_to_fit(130, 130)
  #                     .call
  #   photo.image.attach(io: File.open(processed_image.path), filename: photo.image.filename,
  #                      content_type: photo.image.content_type)
  # end
end
