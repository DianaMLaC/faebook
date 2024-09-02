# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require date
require_relative 'seed_content'
# helpers

def create_friendship(requester, receiver)
  Friendship.create!(sender_id: requester.id, receiver_id: receiver.id, is_accepted: true)
end

def create_post(profile_id, author_id, body)
  Post.create!(profile_id:, author_id:, body:)
end

def create_comment(post_id, author_id, text, parent_comment_id = nil)
  Comment.create!(post_id:, author_id:, text:, parent_comment_id:)
end

def create_like(likeable, user)
  Like.create!(likeable_id: likeable.id,
               likeable_type: likeable.class,
               liker_id: user.id)
end

# Users

tory = User.new(email: 'tory@vega.com',
                first_name: 'Tory',
                last_name: 'Vega',
                date_of_birth: Date.parse('2002-06-11'),
                password: 'ToryVega')
tory.save!

darcy = User.new(email: 'darcy@vega.com',
                 first_name: 'Darcy',
                 last_name: 'Vega',
                 date_of_birth: Date.parse('2002-06-11'),
                 password: 'DarcyVega')
darcy.save!

darius = User.new(email: 'darius@acrux.com',
                  first_name: 'Darius',
                  last_name: 'Acrux',
                  date_of_birth: Date.parse('2000-07-30'),
                  password: 'DariusAcrux')
darius.save!

seth = User.new(email: 'seth@capella.com',
                first_name: 'Seth',
                last_name: 'Capella',
                date_of_birth: Date.parse('2000-01-28'),
                password: 'SethCapella')
seth.save!

caleb = User.new(email: 'caleb@altair.com',
                 first_name: 'Caleb',
                 last_name: 'Altair',
                 date_of_birth: Date.parse('2000-05-20'),
                 password: 'CalebAltair')
caleb.save!

max = User.new(email: 'max@rigel.com',
               first_name: 'Max',
               last_name: 'Rigel',
               date_of_birth: Date.parse('2000-03-01'),
               password: 'MaxRigel')
max.save!

lance = User.new(email: 'lance@orion.com',
                 first_name: 'Lance',
                 last_name: 'Orion',
                 date_of_birth: Date.parse('1994-09-30'),
                 password: 'LanceOrion')
lance.save!

geraldine = User.new(email: 'geraldine@grus.com',
                     first_name: 'Geraldine',
                     last_name: 'Grus',
                     date_of_birth: Date.parse('2001-11-30'),
                     password: 'GeraldineGrus')
geraldine.save!

# Intros
tory.intro.create!(house: 'Ignis',
                   location: 'Solaria',
                   education: 'Zodiac Academy',
                   elements: 'Fire, Earth, Air, Water',
                   zodiac: 'Gemini',
                   order: 'Phoenix',
                   bio: 'Everyone knows, karma’s a bitch. And today her name was Tory Vega.')

darcy.intro.create!(house: 'Aer',
                    location: 'Solaria',
                    education: 'Zodiac Academy',
                    elements: 'Fire, Earth, Air, Water',
                    zodiac: 'Gemini',
                    order: 'Phoenix',
                    bio: "My deepest fear is being cast aside, my heart crushed by trusting blindly again. So I'll never let anyone in again.")

darius.intro.create!(house: 'Ignis',
                     location: 'Solaria',
                     education: 'Zodiac Academy',
                     elements: 'Fire, Water',
                     zodiac: 'Leo',
                     order: 'Dragon',
                     bio: 'This freedom tastes like ashes')

seth.intro.create!(house: 'Aer',
                   location: 'Solaria',
                   education: 'Zodiac Academy',
                   elements: 'Air, Earth',
                   zodiac: 'Aquarius',
                   order: 'Werewolf',
                   bio: "I liked it so it's mine")

caleb.intro.create!(house: 'Terra',
                    location: 'Solaria',
                    education: 'Zodiac Academy',
                    elements: 'Earth, Fire',
                    zodiac: 'Taurus',
                    order: 'Vampire',
                    bio: 'A man with charm is a very dangerous thing')

max.intro.create!(house: 'Aqua',
                  location: 'Solaria',
                  education: 'Zodiac Academy',
                  elements: 'Water, Air',
                  zodiac: 'Pisces',
                  order: 'Siren',
                  bio: 'I have sea foam in my veins, I understand the language of the waves')

lance.intro.create!(house: 'Aer',
                    location: 'Solaria',
                    education: 'Zodiac Academy',
                    elements: 'Air, Water',
                    zodiac: 'Libra',
                    order: 'Vampire',
                    bio: "Sorry I'm late. I got here as soon as I wanted to")

geraldine.intro.create!(house: 'Terra',
                        location: 'Solaria',
                        education: 'Zodiac Academy',
                        elements: 'Earth, Water',
                        zodiac: 'Scorpio',
                        order: 'Cerberus',
                        bio: 'I am the fair demon who haunts your nightmares, shadow fiends. Fell the kiss of justice when I strike you down and banish you to the depths of the nether world!')

# Friendships

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

# Posts Comments and Likes
users = {
  tory:,
  darcy:,
  darius:,
  seth:,
  caleb:,
  max:,
  lance:,
  geraldine:
}

users.each do |user_key, user|
  user_data = posts_data[user_key]

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
        create_like(comment, liker)
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

# Photos
