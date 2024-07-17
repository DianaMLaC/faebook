module AuthHelper
  def user_params
    { firstName: Faker::Name.first_name,
      lastName: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      dateOfBirth: '2000-10-20',
      email: Faker::Internet.email }
  end

  def create_and_sign_in_user(_user_info)
    # post '/api/users', params: { user: user_info }
    # user_response = JSON.parse(@response.body)
    # User.find_by(id: user_response['id'])
    user = User.create!(user_params)
    sign_in(user)
    user
  end

  def sign_in(user)
    cookies.signed[:auth_token] = user.session_token
  end
end
