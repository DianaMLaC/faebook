# == Schema Information
#
# Table name: chats
#
#  id         :uuid             not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Chat < ApplicationRecord
  validates :name, presence: true

  has_many :messages
  has_many :chat_subscriptions
  has_many :participants, through: :chat_subscriptions, source: :participant
end
