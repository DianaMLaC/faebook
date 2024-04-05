# == Schema Information
#
# Table name: likes
#
#  id            :uuid             not null, primary key
#  liker_id      :uuid
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  likeable_type :string
#  likeable_id   :uuid
#
require "test_helper"

class LikeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
