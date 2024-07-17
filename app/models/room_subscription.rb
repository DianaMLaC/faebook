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
class RoomSubscription < ApplicationRecord
  belongs_to :participant,
             class_name: 'User',
             foreign_key: :participant_id

  belongs_to :room,
             class_name: 'Room',
             foreign_key: :room_id

  validates :participant_id, uniqueness: { scope: :room_id, message: 'User already belongs to room!' }

  after_create :create_join_message
  after_destroy :create_leave_message

  private

  def create_join_message
    Message.create(content: "#{participant.first_name} joined the room", sender: participant, room:)
  end

  def create_leave_message
    Message.create(content: "#{participant.first_name} left the room", sender: participant, room:)
  end
end
