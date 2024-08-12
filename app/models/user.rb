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
  has_secure_password

  validates :first_name, :last_name, :password_digest, :date_of_birth, :email, presence: true
  validates :date_of_birth,
            comparison: { less_than: 14.years.ago.to_date,
                          message: 'You have to be older than 14 to create an account' }
  validates :email, uniqueness: true, email: { mode: :strict, message: 'Not a valid email address' }
  validates :password, length: { minimum: 6, message: 'Password must be at least 6 characters long' }
  validate :password_must_be_of_mix_case

  before_create :create_session_token

  has_many :authored_posts,
           dependent: :destroy,
           foreign_key: :author_id,
           class_name: 'Post'

  has_many :profile_posts,
           dependent: :destroy,
           foreign_key: :profile_id,
           class_name: 'Post'

  has_many :comments,
           dependent: :destroy,
           foreign_key: :author_id,
           class_name: 'Comment'

  has_many :likes,
           dependent: :destroy,
           foreign_key: :liker_id,
           class_name: 'Like'

  has_many :received_friendships,
           dependent: :destroy,
           foreign_key: :receiver_id,
           class_name: 'Friendship'

  has_many :sent_friendships,
           dependent: :destroy,
           foreign_key: :sender_id,
           class_name: 'Friendship'

  has_many :received_friends,
           dependent: :destroy,
           through: :received_friendships,
           source: :receiver

  has_many :sent_friends,
           dependent: :destroy,
           through: :sent_friendships,
           source: :sender

  has_many :albums,
           dependent: :destroy,
           foreign_key: :user_id,
           class_name: 'Album'

  has_one :intro,
          dependent: :destroy,
          foreign_key: :user_id,
          class_name: 'Intro'

  has_many :photos,
           dependent: :destroy,
           through: :albums,
           source: :photos

  has_many :messages,
           class_name: 'Message',
           foreign_key: :sender_id

  has_many :chat_subscriptions,
           class_name: 'ChatSubscription',
           foreign_key: :participant_id,
           dependent: :destroy

  has_many :chats,
           through: :chat_subscriptions,
           source: :chat

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

  def has_password?(password)
    passwd = BCrypt::Password.new(password_digest)
    passwd == password
  end

  def password=(password)
    @password = password
    # debugger
    self.password_digest = BCrypt::Password.create(password)
  end

  def authenticate_with_error(password)
    if has_password?(password)
      true
    else
      errors.add(:base, 'Email and password combination is invalid')
      false
    end
  end

  private

  def create_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
  end

  def password_must_be_of_mix_case
    return unless password.present? && password == password.downcase

    errors.add(:password, 'Password is missing capital letters')
  end
end
