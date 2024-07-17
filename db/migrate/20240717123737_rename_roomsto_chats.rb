class RenameRoomstoChats < ActiveRecord::Migration[7.1]
  def change
    rename_table :rooms, :chats
    rename_column :chats, :description, :name
  end
end
