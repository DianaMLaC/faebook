# == Schema Information
#
# Table name: intros
#
#  id           :uuid             not null, primary key
#  work         :string
#  location     :string
#  education    :string
#  relationship :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :uuid
#
class Intro < ApplicationRecord
  RELATIONSHIP_STATUSES = %w[single married divorced widowed in_a_relationship its_complicated]
  validates :user_id, presence: true
  validates :relationship, inclusion: { in: RELATIONSHIP_STATUSES }

  belongs_to :user,
             foreign_key: :user_id,
             class_name: 'User'
end
