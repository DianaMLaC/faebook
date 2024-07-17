class CreateRoomSubscriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :room_subscriptions, id: :uuid do |t|
      t.uuid :participant_id
      t.uuid :room_id

      t.timestamps
    end

    add_index :room_subscriptions, %i[participant_id room_id], unique: true
    add_foreign_key :room_subscriptions, :users, column: :participant_id
    add_foreign_key :room_subscriptions, :rooms, column: :room_id
  end
end
