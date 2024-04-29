# == Schema Information
#
# Table name: intros
#
#  id           :uuid             not null, primary key
#  work         :string
#  location     :string
#  education    :string
#  relationship :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :uuid
#
require "test_helper"

class IntroTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
