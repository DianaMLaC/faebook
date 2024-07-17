# == Schema Information
#
# Table name: chat_subscriptions
#
#  id             :uuid             not null, primary key
#  participant_id :uuid
#  chat_id        :uuid
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
require "test_helper"

class RoomSubscriptionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
