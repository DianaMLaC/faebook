require 'test_helper'

def user_params
  { firstName: Faker::Name.first_name,
    lastName: Faker::Name.last_name,
    password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
    dateOfBirth: '2000-10-20',
    email: Faker::Internet.email }
end

def post_body
  Faker::ChuckNorris.fact
end

def create_unauthenticated_user
  User.create!(first_name: Faker::Name.first_name,
               last_name: Faker::Name.last_name,
               password: Faker::Internet.password(min_length: 6, mix_case: true,
                                                  special_characters: true),
               date_of_birth: '2000-10-20',
               email: Faker::Internet.email)
end

def create_and_sign_in_user(user_info)
  post '/api/users', params: { user: user_info }

  user_response = JSON.parse(@response.body)
  User.find_by(id: user_response['id'])
end

def create_friendship(user_one, user_two)
  Friendship.create!(sender_id: user_one.id, receiver_id: user_two.id, is_accepted: true)
end

class Api::PostsControllerTest < ActionDispatch::IntegrationTest
  # before post creation we need to create and log in a user.

  test 'when a user tries to make a post  on his own profile with no body, then response is 422' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    post "/api/users/#{user.id}/posts", params: { post: { body: '' } }

    # Assert
    assert_response 422
  end

  test 'when a user tries to make a post  on his own profile with a given text, then response is 200' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    user_full_name = user.first_name + ' ' + user.last_name

    # Act
    post "/api/users/#{user.id}/posts", params: { post: { body: post_body } }

    # Assert
    assert_response :success

    post_response = JSON.parse(@response.body)
    # check for text, author, createdAt
    assert_not_nil(post_response['body'])
    assert_not_nil(post_response['author'])
    assert_not_nil(post_response['createdAt'])
    # check for display name matching author's first + last name
    assert_not_nil(post_response['author']['displayName'])
    assert_equal(user_full_name, post_response['author']['displayName'])
    # check for author_id being the same as the id in the URI
    assert_equal(user.id, post_response['author']['id'])
  end

  test 'when an unauthorized user tries to create a post, response is 401' do
    # Arrange
    user = create_unauthenticated_user

    # Act
    post "/api/users/#{user.id}/posts", params: { post: { body: post_body } }

    # Assert
    assert_response 401
  end

  test 'when a user tries to make a post on a friends profile, then response is 200' do
    # Arrange
    user_one = create_unauthenticated_user
    user_two = create_and_sign_in_user(user_params)

    create_friendship(user_one, user_two)

    # Act
    post "/api/users/#{user_one.id}/posts", params: { post: { body: post_body } }

    # Assert
    assert_response :success
    post_response = JSON.parse(@response.body)
    post = Post.find_by(id: post_response['id'])
    assert_equal(user_two.id, post_response['author']['id'])
    assert_equal(user_one.id, post.profile_id)
  end

  test 'when a user tries to make a post on a non friend profile, then response is 422' do
    # Arrange
    user_one = create_unauthenticated_user
    create_and_sign_in_user(user_params)

    # Act
    post "/api/users/#{user_one.id}/posts", params: { post: { body: post_body } }

    # Assert
    assert_response 422
    assert_equal(0, Post.count)
  end

  test 'should get all the posts for a specific users profile' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    post "/api/users/#{user.id}/posts", params: { post: { body: post_body } }
    post "/api/users/#{user.id}/posts", params: { post: { body: post_body } }

    get "/api/users/#{user.id}/posts"
    assert_response :success
    get_response = JSON.parse(@response.body)

    assert_equal(2, get_response['posts'].length)
    assert_equal(2, Post.count)
  end

  test 'when an authenticated  user tries to view posts on another friends profile, response is 200' do
    # Arrange
    user_one = create_unauthenticated_user
    user_two = create_and_sign_in_user(user_params)

    create_friendship(user_one, user_two)

    post "/api/users/#{user_one.id}/posts", params: { post: { body: post_body } }
    post "/api/users/#{user_one.id}/posts", params: { post: { body: post_body } }

    # Act
    get "/api/users/#{user_one.id}/posts"

    # Assert
    assert_response :success
    get_response = JSON.parse(@response.body)

    assert_equal(2, get_response['posts'].length)
    assert_equal(2, Post.count)
  end

  test 'when we retrieve posts with no data, then  we return []' do
    # Arrange
    user = create_and_sign_in_user(user_params)

    # Act
    get "/api/users/#{user.id}/posts"

    # Assert
    assert_response :success
    get_response = JSON.parse(@response.body)

    assert_equal([], get_response['posts'])
  end

  test 'when we retrieve posts with data, then we should correct attributes for each post object in the array' do
    # Arrange
    user = create_and_sign_in_user(user_params)
    post "/api/users/#{user.id}/posts", params: { post: { body: post_body } }

    # Act
    get "/api/users/#{user.id}/posts"

    # Assert
    assert_response :success
    get_response = JSON.parse(@response.body)

    post = get_response['posts'].last
    assert_not_nil(post['body'])
    assert_not_nil(post['createdAt'])
    assert_not_nil(post['author'])
    assert_not_nil(post['author']['displayName'])
  end

  test 'when unauthenticated requests to view posts, then 401' do
    # Arrange
    user_one = create_unauthenticated_user
    # Act
    get "/api/users/#{user_one.id}/posts"
    # Assert
    assert_response :unauthorized
  end
end
