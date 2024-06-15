# == Schema Information
#
# Table name: intros
#
#  id          :uuid             not null, primary key
#  house       :string
#  location    :string
#  education   :string
#  elements    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :uuid
#  zodiac_sign :string
#  order       :string
#
require "test_helper"

class IntroTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
