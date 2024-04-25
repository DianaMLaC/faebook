require 'test_helper'

class Api::AlbumsControllerTest < ActionDispatch::IntegrationTest
  # test 'authenticating user to fetch albums' do
  #   # Arrange
  #   first_name = Faker::Name.first_name
  #   last_name = Faker::Name.last_name
  #   password = Faker::Internet.password(min_length: 6, mix_case: true, special_characters: true)
  #   dob = '2000-10-30'
  #   email = Faker::Internet.email

  #   user = User.create!(first_name:, last_name:, password:, date_of_birth: dob,
  #                       email:)
  #   assert_not_nil(user)

  #   post '/api/authentications', params: { email:, password: }
  #   assert_response 200

  #   profile_album = user.albums.create!(name: 'Profile')
  #   cover_album = user.albums.create!(name: 'Cover')
  #   timeline_album = user.albums.create!(name: 'Timeline')
  #   assert_equal(3, Album.count)

  #   profile_album.photos.create!

  #   # Act
  #   get "/api/users/#{user.id}/albums"

  #   # Assert
  #   assert_response 200
  # end
end
