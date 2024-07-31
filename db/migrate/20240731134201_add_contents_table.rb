class AddContentsTable < ActiveRecord::Migration[7.1]
  def change
    remove_column :posts, :photo_url, :string
    add_column :posts, :content_id, :uuid
    add_column :posts, :content_type, :string

    add_index :posts, %i[content_type content_id]
  end
end
