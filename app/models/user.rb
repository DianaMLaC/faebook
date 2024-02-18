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
  validates :password, length: { minimum: 6 }
  validate :password_must_be_of_mix_case

  before_create :create_session_token

  has_many :posts,
           foreign_key: :author_id,
           class_name: 'Post'

  attr_accessor :password

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
