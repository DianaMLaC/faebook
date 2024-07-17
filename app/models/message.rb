# == Schema Information
#
# Table name: messages
#
#  id         :uuid             not null, primary key
#  sender_id  :uuid             not null
#  chat_id    :uuid             not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
  validates :body, presence: true
  belongs_to :sender,
             class_name: 'User',
             foreign_key: :sender_id
  belongs_to :chat,
             class_name: 'Chat',
             foreign_key: :chat_id

  include ActionView::Helpers::DateHelper

  def age
    time_ago_in_words(created_at)
  end
end
