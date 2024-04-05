# == Schema Information
#
# Table name: friendships
#
#  id          :uuid             not null, primary key
#  sender_id   :uuid             not null
#  receiver_id :uuid             not null
#  is_accepted :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Friendship < ApplicationRecord
  validate :sender_and_receiver_cannot_be_the_same
  belongs_to :receiver,
             foreign_key: :receiver_id,
             class_name: 'User'

  belongs_to :sender,
             foreign_key: :sender_id,
             class_name: 'User'

  def sender_and_receiver_cannot_be_the_same
    return unless sender_id == receiver_id

    errors.add(:receiver_id, "can't be the same as sender")
  end
end
