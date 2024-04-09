require 'test_helper'

class Api::AuthenticationsControllerTest < ActionDispatch::IntegrationTest
  test 'when email and password are invalid' do
    post '/api/authentications'
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

    post '/api/authentications', params: { email: 'jane@smith.com', password: 'nopass' }
    assert_response 422

    json_response = JSON.parse(@response.body)

    assert_equal(json_response, {
                   'errors' => {
                     'authentication' => 'Email and/or password are invalid'
                   }
                 })
  end

  test 'when email is invalid' do
    # create user
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

    post '/api/authentications', params: { email: 'jeny@smith.com', password: 'PassworD' }
    assert_response 422
  end

  test 'when username and password are valid' do
    # create user
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

    post '/api/authentications', params: { email: 'jane@smith.com', password: 'PassworD' }
    assert_response :success
    assert_not_nil(session[:auth_token])
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

    post '/api/authentications', params: { email:, password: }

    json_response = JSON.parse(@response.body)

    assert_equal(first_name, json_response['firstName'])
    assert_equal(last_name, json_response['lastName'])
    assert_not_nil(json_response['id'])
  end

  test 'sets session to the user that was last authenticated' do
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

    post '/api/users',
         params: { firstName: 'Sarah', lastName: 'Jones', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'sarah@jones.com' }

    post '/api/authentications', params: { email: 'jane@smith.com', password: 'PassworD' }

    # json_response = JSON.parse(@response.body)
    user = User.find_by(email: 'jane@smith.com')

    assert_response :success

    assert_not_nil(session[:auth_token])
    assert_equal(session[:auth_token], user.session_token)
  end

  test 'when a user signs out, then response is success 200 ' do
    # create user
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

    post '/api/authentications', params: { email: 'jane@smith.com', password: 'PassworD' }

    delete '/api/authentications/'
    assert_response :success
    assert_nil(session[:auth_token])
  end
end
