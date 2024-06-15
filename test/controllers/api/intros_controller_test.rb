require 'test_helper'

def user_params
  { firstName: Faker::Name.first_name,
    lastName: Faker::Name.last_name,
    password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
    dateOfBirth: '2000-10-20',
    email: Faker::Internet.email }
end

def create_and_sign_in_user(user_info)
  post '/api/users', params: { user: user_info }

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
    post "/api/users/#{user.id}/intros", params: { intro: { house: 'Aer' } }

    # Assert
    assert_response 200
    assert_not_nil(user.intro.house)

    res = JSON.parse(@response.body)
    assert_equal(user.intro.house, res['house'])
  end

  test 'when creating an intro entry with all params, success is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    post "/api/users/#{user.id}/intros",
         params: { intro: {
           zodiac_sign: 'Taurus',
           location: 'Solaria',
           education: 'Zodiac Academy',
           house: 'Ignis',
           elements: 'Fire',
           order: 'Minotaur'

         } }

    # Assert
    assert_response 200
    assert_not_nil(user.intro.zodiac_sign)
    assert_not_nil(user.intro.location)
    assert_not_nil(user.intro.education)
    assert_not_nil(user.intro.house)
    assert_not_nil(user.intro.elements)
  end

  test 'when updating intro with only one param, success is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post "/api/users/#{user.id}/intros",
         params: { intro: {
           zodiac_sign: 'Taurus',
           location: 'Solaria',
           education: 'Zodiac Academy',
           house: 'Ignis',
           elements: 'Fire'
         } }
    res = JSON.parse(@response.body)
    intro_id = res['id']
    assert_equal('Solaria', res['location'])

    # Act
    patch "/api/users/#{user.id}/intros/#{intro_id}",
          params: { intro: {
            zodiac_sign: 'Leo'
          } }

    # Assert
    assert_response 200
    resp = JSON.parse(@response.body)
    assert_equal('Leo', resp['zodiacSign'])
  end
end
