class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :text, null: false
      t.uuid :author_id, null: false
      t.uuid :profile_id, null: false

      t.timestamps
    end

    add_foreign_key :posts, :users, column: :author_id
    add_foreign_key :posts, :users, column: :profile_id
  end
end
