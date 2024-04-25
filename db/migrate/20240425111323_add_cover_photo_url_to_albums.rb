class AddCoverPhotoUrlToAlbums < ActiveRecord::Migration[7.1]
  def change
    add_column :albums, :cover_photo_url, :string
  end
end
