class CreatePostUrls < ActiveRecord::Migration[7.1]
  def change
    create_table :post_urls, id: :uuid do |t|
      t.string :title
      t.string :description
      t.string :image
      t.string :url

      t.timestamps
    end
  end
end
