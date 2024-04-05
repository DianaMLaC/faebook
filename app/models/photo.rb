# == Schema Information
#
# Table name: photos
#
#  id          :uuid             not null, primary key
#  album_id    :uuid
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Photo < ApplicationRecord
  belongs_to :album,
             foreign_key: :album_id,
             class_name: 'Album'

  has_one_attached :image
end
