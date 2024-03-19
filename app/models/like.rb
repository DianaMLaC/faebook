# == Schema Information
#
# Table name: likes
#
#  id         :uuid             not null, primary key
#  post_id    :uuid
#  liker_id   :uuid
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
  belongs_to :liker,
             foreign_key: :liker_id,
             class_name: 'User'
end
