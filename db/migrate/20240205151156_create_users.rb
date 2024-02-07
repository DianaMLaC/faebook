class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.date :date_of_birth, null: false
      t.string :email, null: false
      t.string :session_token

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
