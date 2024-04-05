class CreateIntros < ActiveRecord::Migration[7.1]
  def change
    create_table :intros, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.string :work
      t.string :location
      t.string :education
      t.string :relationship

      t.timestamps
    end
    add_index :intros, :user_id
  end
end
