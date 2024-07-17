class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages, id: :uuid do |t|
      t.uuid :sender_id, null: false
      t.uuid :room_id, null: false
      t.text :body, null: false
      t.timestamps
    end

    add_foreign_key :messages, :users, column: :sender_id
    add_foreign_key :messages, :rooms, column: :room_id
  end
end
