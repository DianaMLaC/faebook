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
require "test_helper"

class FriendshipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
