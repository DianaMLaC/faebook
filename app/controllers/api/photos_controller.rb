class Api::PhotosController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  # before_action :resize_before_save, only: [:create]

  def index
    @user = User.find(params[:user_id])
    @photos = @user.photos.order(created_at: :desc)

    if @photos.empty?
      render json: { 'photos' => [] }
    else
      render :index
    end
  end

  def show
    @photo = Photo.includes(:likes, :comments).find(params[:id])
    render :show
  end

  def create
    album = find_or_create_album
    @photo = album.photos.new(photo_params)

    if @photo.save
      if @photo.image.attached?

        # aws_url = "https://faebook.s3.amazonaws.com/#{@photo.image.key}"
        aws_url = @photo.image.service_url
        @photo.update(photo_url: aws_url)
        album.update(cover_photo_url: aws_url)

        # @photo.update(photo_url: rails_blob_path(@photo.image, only_path: false))
        # @photo.save
        # album.update(cover_photo_url: rails_blob_path(@photo.image, only_path: false))
      end
      render :create
    else
      render json: { errors: @photo.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    @photo = Photo.find(params[:id])
    if @photo.update(photo_params)
      render :show
    else
      render json: { errors: @photo.errors.messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.delete
    render json: { 'photos' => 'photo deleted' }, status: 200
  end

  private

  def photo_params
    params.require(:photo).permit(:description, :image)
  end

  def find_or_create_album
    album_name = params[:album_name] || 'Default'
    @authenticated_user.albums.find_by(name: album_name) || @authenticated_user.albums.create(name: album_name)
  end

  def get_url(photo)
    url = url_for(photo.image)
  end
end
