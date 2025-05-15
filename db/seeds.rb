# # This file should ensure the existence of records required to run the application in every environment (production,
# # development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require_relative 'seed_content'
require 'json'
# helpers

puts 'Clearing database...'

# Level 1: Records that have foreign keys to other entities
[Message, ChatSubscription, Like, Comment, Post, Photo].each(&:destroy_all)

# Level 2: Records that own the above
Chat.destroy_all

# Level 3: Records that are root-level
[Album, Friendship, Intro, User].each(&:destroy_all)

puts 'Database cleared.'

posts_data = POSTS_DATA
user_intros = INTROS

def create_friendship(sender, receiver)
  existing_friendship = Friendship.find_by(receiver_id: sender.id,
                                           sender_id: receiver.id) ||
                        Friendship.find_by(
                          receiver_id: receiver.id, sender_id: sender.id
                        )

  existing_friendship || Friendship.create!(sender_id: sender.id, receiver_id: receiver.id,
                                            is_accepted: true)
end

def post_exist?(profile_id, author_id, body)
  Post.exists?(profile_id:, author_id:, body:)
end

def create_post(profile_id, author_id, body)
  Post.create!(profile_id:, author_id:, body:)
end

def create_comment(post_id, author_id, text, parent_comment_id = nil)
  Comment.create!(post_id:, author_id:, text:, parent_comment_id:)
end

def create_like(likeable, liker_id)
  like = Like.find_by(likeable_id: likeable.id, liker_id:)

  like || Like.create!(likeable_id: likeable.id,
                       likeable_type: likeable.class,
                       liker_id:)
end

# Users
puts 'Seeding users...'
# TWINS
tory = User.find_or_create_by!(email: 'tory@vega.com') do |user|
  user.first_name = 'Tory'
  user.last_name = 'Vega'
  user.date_of_birth = Date.parse('2002-06-11')
  user.password = 'ToryVega'
end

darcy = User.find_or_create_by!(email: 'darcy@vega.com') do |user|
  user.first_name = 'Darcy'
  user.last_name = 'Vega'
  user.date_of_birth = Date.parse('2002-06-11')
  user.password = 'DarcyVega'
end

# HEIRS
darius = User.find_or_create_by!(email: 'darius@acrux.com') do |user|
  user.first_name = 'Darius'
  user.last_name = 'Acrux'
  user.date_of_birth = Date.parse('2000-07-30')
  user.password = 'DariusAcrux'
end

seth = User.find_or_create_by!(email: 'seth@capella.com') do |user|
  user.first_name = 'Seth'
  user.last_name = 'Capella'
  user.date_of_birth = Date.parse('2000-01-28')
  user.password = 'SethCapella'
end

caleb = User.find_or_create_by!(email: 'caleb@altair.com') do |user|
  user.first_name = 'Caleb'
  user.last_name = 'Altair'
  user.date_of_birth = Date.parse('2000-05-20')
  user.password = 'CalebAltair'
end

max = User.find_or_create_by!(email: 'max@rigel.com') do |user|
  user.first_name = 'Max'
  user.last_name = 'Rigel'
  user.date_of_birth = Date.parse('2000-03-01')
  user.password = 'MaxRigel'
end

# FRIENDS
lance = User.find_or_create_by!(email: 'lance@orion.com') do |user|
  user.first_name = 'Lance'
  user.last_name = 'Orion'
  user.date_of_birth = Date.parse('1994-09-30')
  user.password = 'LanceOrion'
end

geraldine = User.find_or_create_by!(email: 'geraldine@grus.com') do |user|
  user.first_name = 'Geraldine'
  user.last_name = 'Grus'
  user.date_of_birth = Date.parse('2001-11-30')
  user.password = 'GeraldineGrus'
end

sofia = User.find_or_create_by!(email: 'sofia@cygnus.com') do |user|
  user.first_name = 'Sofia'
  user.last_name = 'Cygnus'
  user.date_of_birth = Date.parse('2002-12-10')
  user.password = 'SofiaCygnus'
end
# create a method that generates the obj bellow
users = {
  tory:,
  darcy:,
  darius:,
  seth:,
  caleb:,
  max:,
  lance:,
  geraldine:,
  sofia:
}
puts 'Users seeded successfully.'

# Intros
puts 'Seeding users intros...'

users.each do |k, v|
  Intro.find_or_create_by!(user_id: v.id) do |intro|
    intro.house = user_intros[k][:house]
    intro.location = user_intros[k][:location]
    intro.education = user_intros[k][:education]
    intro.elements = user_intros[k][:elements]
    intro.zodiac = user_intros[k][:zodiac]
    intro.order = user_intros[k][:order]
    intro.bio = user_intros[k][:bio]
  end
end

puts 'Intros seeded successfully.'

# Friendships
puts 'Seeding friendships...'

users.values.combination(2).each do |sender, receiver|
  create_friendship(sender, receiver)
end

puts 'Friendships seeded successfully.'

puts 'Seeding posts, comments, likes ...'

users.each do |user_key, user|
  user_data = posts_data[user_key]

  next unless posts_data.key?(user_key)

  # Create own posts
  user_data[:own].each do |post_data|
    next if post_exist?(user.id, user.id, post_data[:body])

    post = create_post(user.id, user.id, post_data[:body])

    # Add likes to the post
    users.values.sample(rand(3..7)).each { |liker| create_like(post, liker.id) }

    # Add comments and replies to the post
    post_data[:comments].each do |comment_data|
      commenter = users[comment_data[:user]]
      comment = create_comment(post.id, commenter.id, comment_data[:text])

      # Add replies to the comment
      comment_data[:replies].each do |reply_data|
        replier = users[reply_data[:user]]
        create_comment(post.id, replier.id, reply_data[:text], comment.id)
      end

      # Add likes to comments without a reply from the post author
      if comment_data[:replies].none? { |reply| reply[:user] == user_key }
        liker = users.values.reject { |u| u == commenter }.sample
        create_like(comment, liker.id)
      end
    end
  end

  # Create posts from others on this user's profile
  user_data[:others].each do |other_user_key, post_data|
    other_user = users[other_user_key]

    next if post_exist?(user.id, other_user.id, post_data[:body])

    post = create_post(user.id, other_user.id, post_data[:body])

    # Add likes to the post
    users.values.sample(rand(3..7)).each { |liker| create_like(post, liker.id) }

    # Add comments and replies to the post
    post_data[:comments].each do |comment_data|
      commenter = users[comment_data[:user]]
      comment = create_comment(post.id, commenter.id, comment_data[:text])

      # Add replies to the comment
      comment_data[:replies].each do |reply_data|
        replier = users[reply_data[:user]]
        create_comment(post.id, replier.id, reply_data[:text], comment.id)
      end

      # Add likes to comments without a reply from the post author
      if comment_data[:replies].none? { |reply| reply[:user] == other_user_key }
        liker = users.values.reject { |u| u == commenter }.sample
        create_like(comment, liker.id)
      end
    end
  end
end

puts 'Seeding post-url'
post_url_data = {
  title: 'New York-Style Bagel Recipe',
  description: 'This easy homemade New York-Style Bagel recipe is simply the best! Basic pantry ingredients transform into deliciously chewy freshly made New York bagels.',
  image: 'https://www.sophisticatedgourmet.com/wp-content/uploads/2020/05/new-york-style-bagels-recipe-1.jpg',
  url:
'https://www.sophisticatedgourmet.com/2009/10/new-york-style-bagel-recipe/'

}
post_url = PostUrl.create!(title: post_url_data[:title], description: post_url_data[:description],
                           image: post_url_data[:image], url: post_url_data[:url])

user = users[:geraldine]
Post.create!(profile_id: user.id, author_id: user.id, body: 'Best buttery bagels receipe!', content_type: 'PostUrl',
             content_id: post_url.id)

puts 'Posts, comments and likes seeded successfully.'
# Photos
puts 'Seeding users albums and their cover photos'
# Parse the photos.json file
photos_data = JSON.parse(File.read('db/seeds/photos.json'), symbolize_names: true)

# Seed Covers
puts 'Seeding cover photos...'
photos_data[:covers].each do |(user_name, aws_link)|
  user = users[user_name.to_sym]
  cover_album = user.albums.create!(name: 'Cover')
  cover_album.photos.create!(photo_url: aws_link)
  cover_album.update!(cover_photo_url: aws_link)
  # add_photos_to_album(user, 'Cover', [{ photo_url: aws_link }])
end
puts 'Cover photos seeded successfully.'

# Seed Profile Photos
puts 'Seeding profile photos...'
def add_photos_to_album(album, photos)
  # Iterate over photos and create Photo records
  photos.each do |photo_data|
    # If the photo_data is a hash (for Profile), use description and url
    album.photos.create!(
      description: photo_data[:description],
      photo_url: photo_data[:url]
    )
  end
  url = album.cover_photo.photo_url
  album.update!(cover_photo_url: url)
end

photos_data.except(:covers).each do |user_name, photos|
  user = users[user_name.to_sym]
  profile_album = user.albums.find_or_create_by(name: 'Profile')

  add_photos_to_album(profile_album, photos)
end

puts 'Profile photos seeded successfully.'
