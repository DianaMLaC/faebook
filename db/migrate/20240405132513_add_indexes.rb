class AddIndexes < ActiveRecord::Migration[7.1]
  def change
    add_index :posts, :author_id
    add_index :posts, :profile_id

    add_index :comments, :author_id
    add_index :comments, :post_id

    add_index :likes, :liker_id
    add_index :likes, :likeable_id

    add_index :photos, :album_id

    add_index :albums, :user_id
  end
end
