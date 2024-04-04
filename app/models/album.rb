class Album < ApplicationRecord
  belongs_to :user,
             foreign_key: :user_id,
             class_name: 'User'

  has_many :photos,
           foreign_key: :album_id,
           class_name: 'Photo'
end
