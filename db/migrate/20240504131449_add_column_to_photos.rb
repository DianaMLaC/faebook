class AddColumnToPhotos < ActiveRecord::Migration[7.1]
  def change
    add_column :photos, :photo_url, :string
  end
end
