class CreateAlbums < ActiveRecord::Migration[7.1]
  def change
    create_table :albums, id: :uuid do |t|
      t.uuid :user_id
      t.string :name

      t.timestamps
    end
  end
end
