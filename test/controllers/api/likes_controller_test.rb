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

def faker_text
  Faker::ChuckNorris.fact
end

class Api::LikesControllerTest < ActionDispatch::IntegrationTest
  test 'when a user likes his own post then response is 200' do
    # then it's a success(200) with response body

    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )

    # Act
    post("/api/posts/#{post_obj.id}/likes")

    # Assert
    assert_response :success
    like_res = JSON.parse(@response.body)
    assert_not_nil(like_res)
    assert_not_nil(like_res['id'])
    assert_equal(post_obj.id, like_res['postId'])
    assert_equal(post_author.id, like_res['liker']['id'])
    assert_equal(post_author.display_name, like_res['liker']['displayName'])

    assert_equal(1, Like.all.length)
    assert_equal(post_obj.id, Like.first.post_id)
    assert_equal(post_author.id, Like.first.liker_id)
    assert_equal(post_author.likes, Like.all)
    assert_not_nil(Like.first.created_at)
    assert_not_nil(Like.first.id)
  end

  test 'when an unauthenticated user tries to like a post then response is 401' do
    # then failure, 401

    # Arrange
    user = User.create!(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      date_of_birth: '2000-10-20',
      email: Faker::Internet.email
    )

    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    # log out user
    reset!

    # Act
    post("/api/posts/#{post_obj.id}/likes",
         params: { liker_id: user.id })

    # Assert

    assert_response 401
    res = JSON.parse(@response.body)
    assert_equal({
                   'errors' => {
                     'authentication' => 'Unauthorized! User need to sign in/ log in'
                   }
                 }, res)

    assert_equal([], Like.all)
  end

  test 'when a user tries to like a post that does not exist then response is 404' do
    # Arrange
    liker = create_and_sign_in_user(user_params)

    # Act
    post("/api/posts/#{SecureRandom.uuid}/likes")

    # Assert
    assert_response 404
    assert_equal([], Like.all)
  end

  test 'when a user tries to like a post that he already liked then response is 422' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    Like.create!(post_id: post_obj.id,
                 liker_id: post_author.id)
    # Act
    post("/api/posts/#{post_obj.id}/likes")
    # Assert

    assert_response 422
    res = JSON.parse(@response.body)
    assert_equal({
                   'errors' => {
                     'like' => 'User already liked this'
                   }
                 }, res)
    assert_equal(1, Like.all.length)
  end

  test 'when a user unlikes a post he likes then response is 200' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    like = Like.create!(post_id: post_obj.id,
                        liker_id: post_author.id)
    # Act
    delete("/api/posts/#{post_obj.id}/likes/#{like.id}")

    # Assert
    assert_response :success
    assert_equal([], Like.all)
  end

  test 'when an unauthenticated user unlikes a post he likes then response is 401' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    like = Like.create!(post_id: post_obj.id,
                        liker_id: post_author.id)

    reset!
    # Act
    delete("/api/posts/#{post_obj.id}/likes/#{like.id}")

    # Assert
    assert_response 401
    assert_equal(1, Like.all.length)
  end

  test 'when a user tries to unlike a post twice then response is 404' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    like = Like.create!(post_id: post_obj.id,
                        liker_id: post_author.id)
    like.destroy
    # Act
    delete("/api/posts/#{post_obj.id}/likes/#{like.id}")

    # Assert
    assert_response 404
    assert_equal([], Like.all)
  end

  test 'when a user tries to unlike a post he has not liked yet then response is 404' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )
    like = Like.create!(post_id: post_obj.id,
                        liker_id: post_author.id)

    reset!

    new_user = create_and_sign_in_user(user_params)

    # Act
    delete("/api/posts/#{post_obj.id}/likes/#{like.id}")

    # Assert
    assert_response 404
    assert_equal(1, Like.all.length)
  end

  test 'when there are no likes on a post we return []' do
    # Arrange
    post_author = create_and_sign_in_user(user_params)
    post_obj = Post.create!(
      body: faker_text,
      author_id: post_author.id,
      profile_id: post_author.id
    )

    # Act
    get("/api/posts/#{post_obj.id}/likes")

    # Assert
    assert_response :success
    res = JSON.parse(@response.body)
    assert_equal([], res['likes'])
    assert_equal(0, Like.all.length)
  end
end
