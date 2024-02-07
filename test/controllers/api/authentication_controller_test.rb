require 'test_helper'

class Api::AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test 'when username and password are invalid' do
    post '/api/authentication'
    assert_response 422

    json_response = JSON.parse(@response.body)

    assert_equal(json_response, {
                   'errors' => {
                     'authentication' => 'Email and password are invalid'
                   }
                 })
  end

  test 'when username and password are valid' do
    # create user
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

    post '/api/authentication', params: { email: 'jane@smith.com', password: 'PassworD' }
    assert_response :success
  end
end
