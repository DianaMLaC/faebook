# == Schema Information
#
# Table name: rooms
#
#  id          :uuid             not null, primary key
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Chat < ApplicationRecord
  validates :name, presence: true

  has_many :messages
  has_many :chat_subscriptions
  has_many :participants, through: :chat_subscriptions, source: :participant
end
