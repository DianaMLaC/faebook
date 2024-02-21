class ChangeColumnNameForPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :text, :body
  end
end
