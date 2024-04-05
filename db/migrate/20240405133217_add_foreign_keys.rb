class AddForeignKeys < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :photos, :albums, column: :album_id
    add_foreign_key :albums, :users, column: :user_id
    add_foreign_key :intros, :users, column: :user_id
    add_foreign_key :likes, :users, column: :liker_id
  end
end
