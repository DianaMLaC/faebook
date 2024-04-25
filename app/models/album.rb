# == Schema Information
#
# Table name: albums
#
#  id         :uuid             not null, primary key
#  user_id    :uuid
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Album < ApplicationRecord
  validates :name, inclusion: { in: %w[Profile Cover Timeline Tagged] }

  belongs_to :user,
             foreign_key: :user_id,
             class_name: 'User'

  has_many :photos,
           foreign_key: :album_id,
           class_name: 'Photo'

  def cover_photo
    cover_photo = photos.order(created_at: :desc).first
    # url_for(cover_photo)
  end
end
