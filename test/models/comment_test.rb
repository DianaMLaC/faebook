# == Schema Information
#
# Table name: comments
#
#  id         :uuid             not null, primary key
#  text       :string           not null
#  author_id  :uuid             not null
#  post_id    :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
