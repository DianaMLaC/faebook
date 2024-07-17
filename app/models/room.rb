# == Schema Information
#
# Table name: rooms
#
#  id          :uuid             not null, primary key
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Room < ApplicationRecord
  has_many :messages
  has_many :room_subscriptions
  has_many :participants, through: :room_subscriptions, source: :participant
end
