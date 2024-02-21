require 'test_helper'

def user_params
  { firstName: Faker::Name.first_name,
    lastName: Faker::Name.last_name,
    password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
    dateOfBirth: '2000-10-20',
    email: Faker::Internet.email }
end

def post_text
  Faker::ChuckNorris.fact
end

class Api::PostsControllerTest < ActionDispatch::IntegrationTest
  # before post creation we need to create and log in a user.
  def create_unauthenticated_user
    User.create!(first_name: Faker::Name.first_name,
                 last_name: Faker::Name.last_name,
                 password: Faker::Internet.password(min_length: 6, mix_case: true,
                                                    special_characters: true),
                 date_of_birth: '2000-10-20',
                 email: Faker::Internet.email)
  end

  def sign_in_user(user_info)
    post '/api/users', params: user_info
    post '/api/authentication', params: { email: user_info[:email], password: user_info[:password] }

    JSON.parse(@response.body)
  end

  # test 'failure response when creating a post with no text' do
  #   json_response = sign_in_user(user_params)

  #   user = User.find_by(id: json_response['id'])

  #   post "/api/users/#{user.id}/posts"
  #   assert_response 422
  # end

  test 'successful response when creating a post with a given text' do
    json_response = sign_in_user(user_params)

    user = User.find_by(id: json_response['id'])
    user_full_name = user.first_name + ' ' + user.last_name

    post "/api/users/#{user.id}/posts", params: { text: post_text }
    assert_response :success

    post_response = JSON.parse(@response.body)
    # check for text, author, createdAt
    assert_not_nil(post_response['text'])
    assert_not_nil(post_response['author'])
    assert_not_nil(post_response['createdAt'])
    # check for display name matching author's first + last name
    assert_not_nil(post_response['author']['displayName'])
    assert_equal(user_full_name, post_response['author']['displayName'])
    # check for author_id being the same as the id in the URI
    assert_equal(user.id, post_response['author']['id'])
  end

  test 'failure when creating a post without a user logged in' do
    user = create_unauthenticated_user

    post "/api/users/#{user.id}/posts", params: { text: post_text }
    assert_response 401
  end

  test 'should allow an author to post on another profile' do
    user_one = create_unauthenticated_user
    json_response = sign_in_user(user_params)
    user_two = User.find_by(id: json_response['id'])

    post "/api/users/#{user_one.id}/posts", params: { text: post_text }
    assert_response :success
    post_response = JSON.parse(@response.body)
    post = Post.find_by(id: post_response['id'])
    assert_equal(user_two.id, post_response['author']['id'])
    assert_equal(user_one.id, post.profile_id)
  end

  test 'should get all the posts for a specific users profile' do
    json_response = sign_in_user(user_params)

    user = User.find_by(id: json_response['id'])
    post "/api/users/#{user.id}/posts", params: { text: post_text }
    post "/api/users/#{user.id}/posts", params: { text: post_text }

    get "/api/users/#{user.id}/posts"
    assert_response :success
    get_response = JSON.parse(@response.body)

    assert_equal(2, get_response['posts'].length)
  end

  test 'user authenticated should be able to view posts on another users profile' do
    user_one = create_unauthenticated_user

    json_response = sign_in_user(user_params)
    user_two = User.find_by(id: json_response['id'])

    post "/api/users/#{user_one.id}/posts", params: { text: post_text }
    post "/api/users/#{user_one.id}/posts", params: { text: post_text }

    get "/api/users/#{user_one.id}/posts"
    assert_response :success
    get_response = JSON.parse(@response.body)

    assert_equal(2, get_response['posts'].length)
  end

  test 'should return empty array for users with no posts' do
    json_response = sign_in_user(user_params)
    user = User.find_by(id: json_response['id'])

    get "/api/users/#{user.id}/posts"
    assert_response :success
    get_response = JSON.parse(@response.body)

    assert_not_nil([], get_response['posts'])
  end

  test 'should not allow unauthenticated requests to view post' do
    user_one = User.create!(first_name: Faker::Name.first_name,
                            last_name: Faker::Name.last_name,
                            password: Faker::Internet.password(min_length: 6, mix_case: true,
                                                               special_characters: true),
                            date_of_birth: '2000-10-20',
                            email: Faker::Internet.email)
    get "/api/users/#{user_one.id}/posts"
    assert_response :unauthorized
  end
end
