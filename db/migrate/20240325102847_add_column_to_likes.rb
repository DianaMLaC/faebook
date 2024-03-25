class AddColumnToLikes < ActiveRecord::Migration[7.1]
  def change
    add_column :likes, :likeable_type, :string
    add_column :likes, :likeable_id, :uuid
    remove_column :likes, :post_id
  end
end
