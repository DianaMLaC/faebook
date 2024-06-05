# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  date_of_birth   :date             not null
#  email           :string           not null
#  session_token   :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :first_name, :last_name, :password_digest, :date_of_birth, :email, presence: true
  validates :date_of_birth, comparison: { less_than: 14.years.ago.to_date }
  validates :email, uniqueness: true, email: { mode: :strict }
  # validates :password, length: { minimum: 6 }
  validate :password_must_be_of_mix_case

  before_create :create_session_token

  has_many :authored_posts,
           foreign_key: :author_id,
           class_name: 'Post'

  has_many :profile_posts,
           foreign_key: :profile_id,
           class_name: 'Post'

  has_many :comments,
           foreign_key: :author_id,
           class_name: 'Comment'

  has_many :likes,
           foreign_key: :liker_id,
           class_name: 'Like'

  has_many :received_friendships,
           foreign_key: :receiver_id,
           class_name: 'Friendship'

  has_many :sent_friendships,
           foreign_key: :sender_id,
           class_name: 'Friendship'

  has_many :received_friends,
           through: :received_friendships,
           source: :receiver

  has_many :sent_friends,
           through: :sent_friendships,
           source: :sender

  has_many :albums,
           foreign_key: :user_id,
           class_name: 'Album'

  has_one :intro,
          foreign_key: :user_id,
          class_name: 'Intro'

  has_many :photos,
           through: :albums,
           source: :photos

  attr_reader :password

  def profile_photo_url
    albums.find_by(name: 'Profile')&.cover_photo_url
  end

  def cover_photo_url
    albums.find_by(name: 'Cover')&.cover_photo_url
  end

  def display_name
    first_name + ' ' + last_name
  end

  def friends
    friendships = Friendship.includes(:sender, :receiver)
                            .where('(sender_id = :user_id OR receiver_id = :user_id) AND is_accepted = true', user_id: id)
                            .order(created_at: :desc)

    friendships.map do |friendship|
      friend = friendship.sender_id == id ? friendship.receiver : friendship.sender
      {
        friend:,
        friendship_status: { accepted_status: friendship.is_accepted }
      }
    end
  end

  def friend_requests_pending
    friendships = Friendship.includes(:sender, :receiver)
                            .where('(receiver_id = :user_id) AND is_accepted = false', user_id: id)
                            .order(created_at: :desc)

    friendships.map do |friendship|
      friend = friendship.sender_id == id ? friendship.receiver : friendship.sender
      {
        friend:,
        friendship_status: { accepted_status: friendship.is_accepted }
      }
    end
  end

  def requested_friendships_pending
    friendships = Friendship.includes(:sender, :receiver)
                            .where('(sender_id = :user_id) AND is_accepted = false', user_id: id)
                            .order(created_at: :desc)

    friendships.map do |friendship|
      friend = friendship.sender_id == id ? friendship.receiver : friendship.sender
      {
        friend:,
        friendship_status: { accepted_status: friendship.is_accepted }
      }
    end
  end

  def has_password?(password)
    passwd = BCrypt::Password.new(password_digest)
    passwd == password
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  private

  def create_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
  end

  def password_must_be_of_mix_case
    return unless password.present? && password == password.downcase

    errors.add(:password, 'password is missing capital letters')
  end
end
