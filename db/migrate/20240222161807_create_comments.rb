class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments, id: :uuid do |t|
      t.string :text, null: false
      t.uuid :author_id, null: false
      t.uuid :post_id, null: false

      t.timestamps
    end

    add_foreign_key :comments, :users, column: :author_id
    add_foreign_key :comments, :posts, column: :post_id
  end
end
