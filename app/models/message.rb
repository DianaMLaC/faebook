# == Schema Information
#
# Table name: messages
#
#  id         :uuid             not null, primary key
#  sender_id  :uuid             not null
#  room_id    :uuid             not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
  belongs_to :sender,
             class_name: 'User',
             foreign_key: :sender_id
  belongs_to :room,
             class_name: 'Room',
             foreign_key: :room_id

  include ActionView::Helpers::DateHelper

  def age
    time_ago_in_words(created_at)
  end
end
