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
require "test_helper"

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
