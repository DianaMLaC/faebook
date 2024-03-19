# == Schema Information
#
# Table name: likes
#
#  id         :uuid             not null, primary key
#  post_id    :uuid
#  liker_id   :uuid
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class LikeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
