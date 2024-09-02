# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require_relative 'seed_content'
# helpers

posts_data = POSTS_DATA
user_intros = INTROS

def create_friendship(requester, receiver)
  Friendship.create!(sender_id: requester.id, receiver_id: receiver.id, is_accepted: true)
end

def create_post(profile_id, author_id, body)
  Post.create!(profile_id:, author_id:, body:)
end

def create_comment(post_id, author_id, text, parent_comment_id = nil)
  Comment.create!(post_id:, author_id:, text:, parent_comment_id:)
end

def create_like(likeable, liker_id)
  Like.create!(likeable_id: likeable.id,
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

# Intro.create!(user_id: tory.id,
#               house: 'Ignis',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Fire, Earth, Air, Water',
#               zodiac: 'Gemini',
#               order: 'Phoenix',
#               bio: 'Everyone knows karma’s a bitch. And today her name was Tory Vega.')

# Intro.create!(user_id: darcy.id,
#               house: 'Aer',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Fire, Earth, Air, Water',
#               zodiac: 'Gemini',
#               order: 'Phoenix',
#               bio: "My deepest fear is being cast aside, my heart crushed by trusting blindly again. So I'll never let anyone in again.")

# Intro.create!(user_id: darius.id,
#               house: 'Ignis',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Fire, Water',
#               zodiac: 'Leo',
#               order: 'Dragon',
#               bio: 'This freedom tastes like ashes')

# Intro.create!(user_id: seth.id,
#               house: 'Aer',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Air, Earth',
#               zodiac: 'Aquarius',
#               order: 'Werewolf',
#               bio: "I licked it, so it's mine")

# Intro.create!(user_id: caleb.id,
#               house: 'Terra',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Earth, Fire',
#               zodiac: 'Taurus',
#               order: 'Vampire',
#               bio: 'A man with charm is a very dangerous thing')

# Intro.create!(user_id: max.id,
#               house: 'Aqua',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Water, Air',
#               zodiac: 'Pisces',
#               order: 'Siren',
#               bio: 'I have sea foam in my veins, I understand the language of the waves')

# Intro.create!(user_id: lance.id,
#               house: 'Aer',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Air, Water',
#               zodiac: 'Libra',
#               order: 'Vampire',
#               bio: "Sorry I'm late. I got here as soon as I wanted to")

# Intro.create!(user_id: geraldine.id,
#               house: 'Terra',
#               location: 'Solaria',
#               education: 'Zodiac Academy',
#               elements: 'Earth, Water',
#               zodiac: 'Scorpio',
#               order: 'Cerberus',
#               bio: 'I am the fair demon who haunts your nightmares, shadow fiends. Fell the kiss of justice when I strike you down and banish you to the depths of the nether world!')

# Friendships
puts 'Seeding friendships...'
create_friendship(tory, darcy)
create_friendship(tory, geraldine)
create_friendship(tory, darius)
create_friendship(tory, caleb)
create_friendship(tory, max)
create_friendship(tory, seth)
create_friendship(tory, lance)

create_friendship(darcy, geraldine)
create_friendship(darcy, lance)
create_friendship(darcy, darius)
create_friendship(darcy, caleb)
create_friendship(darcy, max)
create_friendship(darcy, seth)

create_friendship(darius, lance)
create_friendship(darius, caleb)
create_friendship(darius, max)
create_friendship(darius, seth)
create_friendship(darius, geraldine)

create_friendship(seth, caleb)
create_friendship(seth, max)
create_friendship(seth, lance)
create_friendship(seth, geraldine)

create_friendship(caleb, max)
create_friendship(caleb, lance)
create_friendship(caleb, geraldine)

create_friendship(max, lance)
create_friendship(max, geraldine)

create_friendship(geraldine, lance)

puts 'Friendships seeded successfully.'

# Posts Comments and Likes

puts 'Seeding posts, comments, likes ...'

users.each do |user_key, user|
  user_data = posts_data[user_key]

  next unless posts_data.key?(user_key)

  # Create own posts
  user_data[:own].each do |post_data|
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

puts 'Posts, comments and likes seeded successfully.'

# Photos
