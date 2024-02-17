require 'test_helper'

class Api::AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test 'when email and password are invalid' do
    post '/api/authentication'
    assert_response 422

    json_response = JSON.parse(@response.body)

    assert_equal(json_response, {
                   'errors' => {
                     'authentication' => 'Email and/or password are invalid'
                   }
                 })
  end

  test 'when password is invalid' do
    # create user
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

    post '/api/authentication', params: { email: 'jane@smith.com', password: 'nopass' }
    # assert_response 422
  end

  # test 'when email is invalid' do
  #   # create user
  #   post '/api/users',
  #        params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
  #                  email: 'jane@smith.com' }

  #   post '/api/authentication', params: { email: 'jane@smith.com', password: 'nopass' }
  #   # assert_response 422
  # end

  test 'when username and password are valid' do
    # create user
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

    post '/api/authentication', params: { email: 'jane@smith.com', password: 'PassworD' }
    assert_response :success
  end

  test 'returns correct response body' do
    email = Faker::Internet.email
    password = Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true)
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name

    post '/api/users',
         params: { firstName: first_name,
                   lastName: last_name,
                   password:,
                   dateOfBirth: '2000-10-20',
                   email: }

    post '/api/authentication', params: { email:, password: }

    json_response = JSON.parse(@response.body)

    assert_equal(first_name, json_response['firstName'])
    assert_equal(last_name, json_response['lastName'])
    assert_not_nil(json_response['id'])
  end
  # test 'no email specified, no password specified'
end
