require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test 'when creating a user with no last name or first name, response is 422' do
    post(
      '/api/users',
      params: {
        user: { firstName: '',
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-30',
                email: Faker::Internet.email }
      }
    )
    assert_response 422

    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: '',
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-30',
                email: Faker::Internet.email }
      }
    )
    assert_response 422
  end

  # password
  test 'when creating a user with no password, response is 422' do
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                dateOfBirth: '2000-10-30',
                email: Faker::Internet.email }
      }
    )

    assert_response 422
  end

  test 'when creating a user with invalid password, response is 422' do
    # less than 6 chars
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: 'Cats',
                dateOfBirth: '2000-10-30',
                email: Faker::Internet.email }
      }
    )
    assert_response 422

    post(
      '/api/users',
      params: {
        user: { firstName: 'Geta',
                lastName: 'Marga',
                password: 'Cuzdrioara4',
                dateOfBirth: '1994-09-18',
                email: 'geta@marga.com' }
      }
    )
    assert_response 200

    # not mixed cased
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: 'password',
                dateOfBirth: '2000-10-30',
                email: Faker::Internet.email }
      }
    )

    assert_response 422
  end

  # # DOB
  test 'when creating a user with no dob, response is 422' do
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                email: Faker::Internet.email }
      }
    )
    assert_response 422
  end

  test 'when creating a user with with dob less than 14 years ago, response is 422' do
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2015-10-03',
                email: Faker::Internet.email }
      }
    )
    assert_response 422
  end

  # Email
  test 'when creating a user with no email, response is 422' do
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-30' }
      }
    )
    assert_response 422
  end

  test 'when creating a user with an email with wrong format, response is 422' do
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-03',
                email: 'janesmith' }
      }
    )
    assert_response 422

    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-03',
                email: 'jane@smith' }
      }
    )
    assert_response 422

    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-03',
                email: 'ja.ne@smith' }
      }
    )
    assert_response 422
  end

  test 'when creating a user with an email already in db, response is 422' do
    # Arrange
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-03',
                email: 'jane@smith.com' }
      }
    )

    # Act
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-03',
                email: 'jane@smith.com' }
      }
    )

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

  test 'when fetching a user profile, response is 200' do
    # Arrange
    post(
      '/api/users',
      params: {
        user: { firstName: Faker::Name.first_name,
                lastName: Faker::Name.last_name,
                password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                dateOfBirth: '2000-10-03',
                email: Faker::Internet.email }
      }
    )

    assert_response :success
    resp = JSON.parse(@response.body)
    user_id = resp['id']

    # Act
    get "/api/users/#{user_id}"

    # Assert
    assert_response :success
  end
end
