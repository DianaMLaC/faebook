require 'test_helper'

class Api::AuthenticationControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test 'post returns 200' do
    post '/api/authentication'
    assert_response :success
  end
end
