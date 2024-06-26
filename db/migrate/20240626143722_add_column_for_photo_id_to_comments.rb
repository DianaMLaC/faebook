class AddColumnForPhotoIdToComments < ActiveRecord::Migration[7.1]
  def change
    add_reference :comments, :photo, type: :uuid, foreign_key: true
  end
end
