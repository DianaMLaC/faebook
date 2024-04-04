class Photo < ApplicationRecord
  belongs_to :album,
             foreign_key: :album_id,
             class_name: 'Album'

  has_one_attached :image
end
