require 'test_helper'

def user_params
  { firstName: Faker::Name.first_name,
    lastName: Faker::Name.last_name,
    password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
    dateOfBirth: '2000-10-20',
    email: Faker::Internet.email }
end

def create_and_sign_in_user(user_info)
  post '/api/users', params: user_info

  user_response = JSON.parse(@response.body)
  User.find_by(id: user_response['id'])
end

class Api::IntrosControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test 'when creating an intro entry with only one param, success is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    post "/api/users/#{user.id}/intros", params: { intro: { relationship: 'married' } }

    # Assert
    assert_response 200
    assert_not_nil(user.intro.relationship)

    res = JSON.parse(@response.body)
    assert_equal(user.intro.relationship, res['intro']['relationship'])
  end

  test 'when creating an intro entry with all params, success is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    post "/api/users/#{user.id}/intros",
         params: { intro: {
           work: Faker::Job.title,
           location: Faker::Address.city,
           education: Faker::Educator.university,
           relationship: 'single'
         } }

    # Assert
    assert_response 200
    assert_not_nil(user.intro.work)
    assert_not_nil(user.intro.location)
    assert_not_nil(user.intro.education)
    assert_not_nil(user.intro.relationship)
  end

  test 'when updating intro with only one param, success is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post "/api/users/#{user.id}/intros",
         params: { intro: {
           work: Faker::Job.title,
           location: Faker::Address.city,
           education: Faker::Educator.university,
           relationship: 'single'
         } }
    res = JSON.parse(@response.body)
    intro_id = res['intro']['id']
    assert_equal('single', res['intro']['relationship'])

    # Act
    patch "/api/users/#{user.id}/intros/#{intro_id}",
          params: { intro: {
            relationship: 'married'
          } }

    # Assert
    assert_response 200
    resp = JSON.parse(@response.body)
    intro_id = resp['intro']['id']
    assert_equal('married', resp['intro']['relationship'])
  end
end
