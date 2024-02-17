require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  def create_user(user_info, should_fail: false)
    post '/api/users', params: user_info

    if !should_fail
      assert_response :success
    else
      assert_response 422
      return
    end

    json_response = JSON.parse(@response.body)

    assert_equal(user_info[:firstName], json_response['firstName'])
    assert_equal(user_info[:lastName], json_response['lastName'])
    assert_nil(json_response['password'])

    json_response
  end

  def generate_user_info
    { firstName: Faker::Name.first_name, lastName: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true), dateOfBirth: '2000-10-20', email: Faker::Internet.email }
  end

  test 'filters empty values' do
    input = { 'email' => 'Email has already been taken', 'firstName' => '', 'lastName' => '', 'password' => '',
              'dateOfBirth' => '' }
    output = omit_empty_strings(input)

    assert_equal(output, { 'email' => 'Email has already been taken' })
  end

  test 'returns a user id' do
    # ARRANGE

    # ACT
    # make a POST request to create a user
    json_response = create_user({ firstName: 'darcy', lastName: 'smith',
                                  password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
                                  dateOfBirth: '2000-10-20', email: Faker::Internet.email })

    # Assert that the 'id' key exists
    assert json_response.has_key?('id'), "Response should have 'id' key"
    assert_instance_of String, json_response['id'], "'id' should be a String"
  end

  test 'user ids are different' do
    # ARRANGE

    # ACT
    # make a POST request to create a user
    first_user_info = generate_user_info
    json_response = create_user(first_user_info)
    first_user_id = json_response['id']

    second_user_info = generate_user_info
    json_response = create_user(second_user_info)
    second_user_id = json_response['id']

    assert_not_equal(first_user_id, second_user_id)
  end

  test 'user in db has same user_id' do
    # ARRANGE

    # ACT
    # make a POST request to create a user
    user_info = generate_user_info
    json_response = create_user(user_info)
    user_id = json_response['id']

    user = User.find(user_id)
    assert_not_nil(user)
    assert_equal(user.id, user_id)

    assert_equal(user.first_name, json_response['firstName'])
    assert_equal(user.last_name, json_response['lastName'])
  end

  # first_name and last_name
  test 'cannot create invalid user' do
    create_user({ firstName: '', lastName: 'Smith' }, should_fail: true)
    create_user({ lastName: 'Smith' }, should_fail: true)

    create_user({ firstName: 'Jane', lastName: '' }, should_fail: true)
    create_user({ firstName: 'Jane' }, should_fail: true)

    create_user({}, should_fail: true)
  end

  # password
  test 'password must be given' do
    post '/api/users', params: { firstName: 'Jane', lastName: 'Smith' }
    assert_response 422
  end

  test 'password should be minimum 6 characters and mix case' do
    post '/api/users', params: { firstName: 'Jane', lastName: 'Smith', password: 'cats' }
    assert_response 422

    post '/api/users', params: { firstName: 'Jane', lastName: 'Smith', password: 'password' }
    assert_response 422

    # post "/api/users", params: { firstName: 'Jane', lastName: 'Smith', password: 'Password'}
    # assert_response :success
  end

  test 'password belonging to user can be retrieved' do
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }
    assert_response 200

    json_response = JSON.parse(@response.body)
    user = User.find_by(id: json_response['id'])
    assert_not_nil(user.password_digest)
    assert(user.has_password?('PassworD'))
  end

  # DOB
  test 'dob must be given' do
    post '/api/users', params: { firstName: 'Jane', lastName: 'Smith', password: 'Password' }
    assert_response 422

    # post "/api/users", params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2000-10-20'}
    # assert_response 200
  end

  test 'user must be at least 14 years old' do
    post '/api/users', params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2015-10-20' }
    assert_response 422
  end

  # Email
  test 'email must be given' do
    post '/api/users', params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2000-10-20' }
    assert_response 422

    post '/api/users',
         params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2000-10-20',
                   email: 'jane@smith.com' }
    assert_response 200
  end

  test "email must have the correct format with '@' and '.' after" do
    post '/api/users',
         params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2000-10-20',
                   email: 'janesmith' }
    assert_response 422

    post '/api/users',
         params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2000-10-20',
                   email: 'jane@smith' }
    assert_response 422

    post '/api/users',
         params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2000-10-20',
                   email: 'ja.ne@smith' }
    assert_response 422
  end

  test 'email must be unique' do
    post '/api/users',
         params: { firstName: 'Jane', lastName: 'Smith', password: 'Password', dateOfBirth: '2000-10-20',
                   email: 'jane@smith.com' }
    post '/api/users',
         params: { firstName: 'Julie', lastName: 'Soul', password: 'PassworD', dateOfBirth: '2000-10-30',
                   email: 'jane@smith.com' }

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
    user_info = generate_user_info
    json_response = create_user(user_info)

    assert_not_nil(session[:auth_token])

    user_id = json_response['id']
    user = User.find(user_id)
    assert_equal(session[:auth_token], user.session_token)
  end
end
