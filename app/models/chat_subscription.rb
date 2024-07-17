# == Schema Information
#
# Table name: room_subscriptions
#
#  id             :uuid             not null, primary key
#  participant_id :uuid
#  room_id        :uuid
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class ChatSubscription < ApplicationRecord
  belongs_to :participant,
             class_name: 'User',
             foreign_key: :participant_id

  belongs_to :chat,
             class_name: 'Chat',
             foreign_key: :chat_id

  validates :participant_id, uniqueness: { scope: :chat_id, message: 'User already belongs to chat!' }

  after_create :create_join_message
  after_destroy :create_leave_message

  private

  def create_join_message
    Message.create(content: "#{participant.first_name} joined the chat", sender: participant, chat:)
  end

  def create_leave_message
    Message.create(content: "#{participant.first_name} left the chat", sender: participant, chat:)
  end
end
