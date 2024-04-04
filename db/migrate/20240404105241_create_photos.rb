class CreatePhotos < ActiveRecord::Migration[7.1]
  def change
    create_table :photos, id: :uuid do |t|
      t.uuid :album_id
      t.string :description

      t.timestamps
    end
  end
end
