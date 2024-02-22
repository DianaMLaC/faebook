# == Schema Information
#
# Table name: posts
#
#  id         :uuid             not null, primary key
#  body       :string           not null
#  author_id  :uuid             not null
#  profile_id :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
  belongs_to :author,
             foreign_key: :author_id,
             class_name: 'User'
  belongs_to :profile,
             foreign_key: :profile_id,
             class_name: 'User'

  has_many :comments,
           foreign_key: :post_id,
           class_name: 'Comment'
end
