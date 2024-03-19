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
  test 'when a user likes his own post' do
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
    assert_equal(post_obj.id, like_res['postID'])
    assert_equal(post_author.id, like_res['postID'])
    assert_equal(1, Like.all.length)
  end
end
