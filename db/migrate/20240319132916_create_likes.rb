class CreateLikes < ActiveRecord::Migration[7.1]
  def change
    create_table :likes, id: :uuid do |t|
      t.uuid :post_id
      t.uuid :liker_id

      t.timestamps
    end
  end
end