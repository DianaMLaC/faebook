require 'test_helper'

class Api::CommentsControllerTest < ActionDispatch::IntegrationTest
  # helper methods
  def user_params
    { firstName: Faker::Name.first_name,
      lastName: Faker::Name.last_name,
      password: Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true),
      dateOfBirth: '2000-10-20',
      email: Faker::Internet.email }
  end

  def faker_text
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

  def sign_in_user(user_info)
    post '/api/users', params: user_info
    post '/api/authentication', params: { email: user_info[:email], password: user_info[:password] }

    user_response = JSON.parse(@response.body)
    user = User.find_by(id: user_response['id'])
    user.id
  end

  def create_post(user_id)
    post "/api/users/#{user_id}/posts", params: { body: faker_text }
    post_response = JSON.parse(@response.body)
    post = Post.find_by(id: post_response['id'])
    post.id
  end

  test 'success response when an authenticated user comments on a post' do
    # create user
    # user_id = sign_in_user(user_params)
    user_email = Faker::Internet.email
    User.create!(first_name: Faker::Name.first_name,
                 last_name: Faker::Name.last_name,
                 password: Faker::Internet.password(min_length: 6, mix_case: true,
                                                    special_characters: true),
                 date_of_birth: '2000-10-20',
                 email: user_email)
    user = User.find_by(email: user_email)
    # assert_not_nil(session[:auth_token])
    assert_not_nil(user)

    session[:auth_token] = user.session_token
    # assert_equal(session[:auth_token], user.session_token)
    # create post
    # post_id = create_post(user_id)
    # # create comment

    # post "/api/users/#{user_id}/posts/#{post_id}/comments", params: { text: faker_text }
    # assert_response :success
    # # check response to include : id, text, createdAt, author details
    # comment_response = JSON.parse(@response.body)
    # assert_not_nil(comment_response['id'])
    # assert_not_nil(comment_response['text'])
    # assert_not_nil(comment_response['createdAt'])
  end

  # test 'failure response when an unauthorized user comments on a post' do
  #   # sign in user to get user id for profile id when creating post
  #   user_one_id = sign_in_user(user_params)
  #   # create post to get post id for url when creating comments
  #   post_id = create_post(user_one_id)

  #   post "/api/users/#{user_one_id}/posts/#{post_id}/comments", params: { text: faker_text }
  #   assert_response :success

  #   user_two = create_unauthenticated_user
  #   # now that we have a profile belonging to user_one with user_one's own post on it, how does user_two create the comment on the post?
  #   # in the post we had it set up that the author id is the user authenticated, but in this case,
  #   # the user authenticated is user_one,
  #   # should I just pass the author_id in the params?
  #   # but even if I do, in my crate method I reassign the author_id to match the id of the user that has the session_token same as session[:auth_token]
  #   # so do I need a log out method? for our first user that created the post?
  # end
end
