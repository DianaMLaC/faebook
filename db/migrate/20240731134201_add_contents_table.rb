class AddContentsTable < ActiveRecord::Migration[7.1]
  def change
    create_table :contents, id: :uuid do |t|
      t.uuid :content_id, null: false
      t.string :content_type, null: false
      t.timestamps
    end

    remove_column :posts, :photo_url, :string
    add_column :posts, :extra_content_id, :uuid

    add_index :contents, %i[content_type content_id]
  end
end
