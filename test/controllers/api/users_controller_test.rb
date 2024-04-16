require 'test_helper'

def createUser(user_info); end

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  # def create_user(user_info, should_fail: false)
  #   post '/api/users', params: user_info

  #   if !should_fail
  #     assert_response :success
  #   else
  #     assert_response 422
  #     return
  #   end

  #   json_response = JSON.parse(@response.body)

  #   assert_equal(user_info[:firstName], json_response['firstName'])
  #   assert_equal(user_info[:lastName], json_response['lastName'])
  #   assert_nil(json_response['password'])

  #   json_response
  # end

  # def generate_user_info
  #   { firstName: Faker::Name.first_name, lastName: Faker::Name.last_name,
  #     password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true), dateOfBirth: '2000-10-20', email: Faker::Internet.email }
  # end

  # first_name and last_name
  test 'when creating a user with no last name or first name, response is 422' do
    post '/api/users', params:
        { firstName: '',
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-30',
          email: Faker::Internet.email }
    assert_response 422

    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: '',
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-30',
          email: Faker::Internet.email }
    assert_response 422
  end

  # password
  test 'when creating a user with no password, response is 422' do
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          dateOfBirth: '2000-10-30',
          email: Faker::Internet.email }
    assert_response 422
  end

  test 'when creating a user with invalid password, response is 422' do
    # less than 6 chars
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: 'Cats',
          dateOfBirth: '2000-10-30',
          email: Faker::Internet.email }
    assert_response 422

    # not mixed cased
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: 'password',
          dateOfBirth: '2000-10-30',
          email: Faker::Internet.email }
    assert_response 422
  end

  test 'when trying to retrieve a users password, response is 200' do
    # Arrange
    password = Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true)
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password:,
          dateOfBirth: '2000-10-30',
          email: Faker::Internet.email }

    assert_response :success
    json_response = JSON.parse(@response.body)

    # Act
    user = User.find_by(id: json_response['id'])

    # Assert
    assert_not_nil(user.password_digest)
    assert(user.has_password?(password))
  end

  # DOB
  test 'when creating a user with no dob, response is 422' do
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          email: Faker::Internet.email }
    assert_response 422
  end

  test 'when creating a user with with dob less than 14 years ago, response is 422' do
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2015-10-03',
          email: Faker::Internet.email }
    assert_response 422
  end

  # Email
  test 'when creating a user with no email, response is 422' do
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-30' }
    assert_response 422
  end

  test 'when creating a user with an email with wrong format, response is 422' do
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-03',
          email: 'janesmith' }
    assert_response 422

    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-03',
          email: 'jane@smith' }
    assert_response 422

    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-03',
          email: 'ja.ne@smith' }
    assert_response 422
  end

  test 'when creating a user with an email already in db, response is 422' do
    # Arrange
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-03',
          email: 'jane@smith.com' }

    # Act
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-03',
          email: 'jane@smith.com' }

    # Assert

    assert_response 422

    json_response = JSON.parse(@response.body)

    assert_equal(json_response, {
                   'errors' => {
                     'user' => {
                       'email' => 'Email has already been taken'
                     }
                   }
                 })
  end

  # Session

  test 'sets session aka signs user in upon creation' do
    # Arrange
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-03',
          email: Faker::Internet.email }

    # Act
    resp = JSON.parse(@response.body)

    # Assert
    assert_not_nil(session[:auth_token])

    user_id = resp['id']
    user = User.find_by(id: user_id)
    assert_equal(session[:auth_token], user.session_token)
  end

  test 'when fetching a user profile, response is 200' do
    # Arrange
    post '/api/users', params:
        { firstName: Faker::Name.first_name,
          lastName: Faker::Name.last_name,
          password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
          dateOfBirth: '2000-10-03',
          email: Faker::Internet.email }

    resp = JSON.parse(@response.body)
    user_id = resp['id']

    # Act
    get "/api/users/#{user_id}"

    # Assert
    assert_response :success
  end
end
