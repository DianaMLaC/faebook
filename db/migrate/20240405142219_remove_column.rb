class RemoveColumn < ActiveRecord::Migration[7.1]
  def change
    remove_column :intros, :user_id
    add_column :intros, :user_id, :uuid
  end
end
