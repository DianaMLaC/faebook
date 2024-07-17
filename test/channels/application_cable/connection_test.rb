require 'test_helper'

module ApplicationCable
  class ConnectionTest < ActionCable::Connection::TestCase
    def user_params
      { first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
        date_of_birth: '2000-10-20',
        email: Faker::Internet.email }
    end

    def sign_in(user)
      cookies.signed[:auth_token] = user.session_token
    end

    test 'connects with cookies' do
      user = User.create!(user_params)
      sign_in(user)

      cookies.signed[:auth_token] = user.session_token

      connect

      assert_equal connection.current_user.id, user.id
    end
  end
end
