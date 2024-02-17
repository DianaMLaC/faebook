# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  date_of_birth   :date             not null
#  email           :string           not null
#  session_token   :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
