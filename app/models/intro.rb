# == Schema Information
#
# Table name: intros
#
#  id          :uuid             not null, primary key
#  house       :string
#  location    :string
#  education   :string
#  elements    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :uuid
#  zodiac_sign :string
#  order       :string
#
class Intro < ApplicationRecord
  HOUSES = %w[Aer Ignis Terra Aqua]
  validates :user_id, presence: true
  validates :house, inclusion: { in: HOUSES }

  belongs_to :user,
             foreign_key: :user_id,
             class_name: 'User'
end
