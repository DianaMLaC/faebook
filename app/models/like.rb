# == Schema Information
#
# Table name: likes
#
#  id            :uuid             not null, primary key
#  liker_id      :uuid
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  likeable_type :string
#  likeable_id   :uuid
#
class Like < ApplicationRecord
  belongs_to :liker,
             foreign_key: :liker_id,
             class_name: 'User'

  belongs_to :likeable, polymorphic: true
end
