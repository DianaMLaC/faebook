class RenameRoomstoChats < ActiveRecord::Migration[7.1]
  def change
    # Remove old foreign keys & indexes
    remove_foreign_key :messages, :rooms
    remove_foreign_key :room_subscriptions, :rooms
    remove_index :room_subscriptions, %i[participant_id room_id]

    # Rename tables
    rename_table :rooms, :chats
    rename_table :room_subscriptions, :chat_subscriptions

    # Rename columns
    rename_column :chats, :description, :name
    rename_column :messages, :room_id, :chat_id
    rename_column :chat_subscriptions, :room_id, :chat_id

    # Add new foreign keys & indexes
    add_foreign_key :messages, :chats, column: :chat_id
    add_foreign_key :chat_subscriptions, :chats, column: :chat_id
    add_index :chat_subscriptions, %i[participant_id chat_id], unique: true
  end
end
