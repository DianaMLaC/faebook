class CreateFriendships < ActiveRecord::Migration[7.1]
  def change
    create_table :friendships, id: :uuid do |t|
      t.uuid :sender_id, null: false
      t.uuid :receiver_id, null: false
      t.boolean :is_accepted, default: false

      t.timestamps
    end
    add_foreign_key :friendships, :users, column: :sender_id
    add_foreign_key :friendships, :users, column: :receiver_id

    add_index :friendships, %i[receiver_id is_accepted]
    add_index :friendships, :receiver_id
    add_index :friendships, :sender_id
  end
end
