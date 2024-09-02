# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require_relative 'seed_content'
# helpers

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

# Posts Comments and Likes
# puts 'Deleting all posts with they dependencies'

# Post.all.each(&:destroy)

# if Post.all.empty?
#   puts 'Posts deleted successfully'
# else
#   puts 'Post entries found in db'
# end

# if Comment.all.empty?
#   puts 'Comments deleted successfully'
# else
#   puts 'Comments entries found in db'
# end

# if Like.all.empty?
#   puts 'Likes deleted successfully'
# else
#   puts 'Likes entries found in db'
# end

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

puts 'Posts, comments and likes seeded successfully.'

# Photos
