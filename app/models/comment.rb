# == Schema Information
#
# Table name: comments
#
#  id                :uuid             not null, primary key
#  text              :string           not null
#  author_id         :uuid             not null
#  post_id           :uuid             not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  parent_comment_id :uuid
#
class Comment < ApplicationRecord
  validates(:text, presence: true)

  belongs_to :post,
             foreign_key: :post_id,
             class_name: 'Post'

  belongs_to :author,
             foreign_key: :author_id,
             class_name: 'User'

  has_many :replies,
           foreign_key: :parent_comment_id,
           class_name: 'Comment'
end
