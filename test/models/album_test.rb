# == Schema Information
#
# Table name: albums
#
#  id         :uuid             not null, primary key
#  user_id    :uuid
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class AlbumTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
