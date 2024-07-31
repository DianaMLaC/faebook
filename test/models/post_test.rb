# == Schema Information
#
# Table name: posts
#
#  id               :uuid             not null, primary key
#  body             :string           not null
#  author_id        :uuid             not null
#  profile_id       :uuid             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  extra_content_id :uuid
#
require "test_helper"

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
