class AddColumnToComments < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :parent_comment_id, :uuid
  end
end
