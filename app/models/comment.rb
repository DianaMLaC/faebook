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
  validate(:cannot_comment_on_reply)

  belongs_to :post,
             foreign_key: :post_id,
             class_name: 'Post'

  belongs_to :photo,
             foreign_key: :photo_id,
             class_name: 'Photo'

  belongs_to :author,
             foreign_key: :author_id,
             class_name: 'User'

  has_many :replies,
           foreign_key: :parent_comment_id,
           class_name: 'Comment'

  belongs_to :parent_comment,
             foreign_key: :parent_comment_id,
             class_name: 'Comment',
             optional: true

  has_many :likes, as: :likeable

  def cannot_comment_on_reply
    return if parent_comment.nil?
    return if parent_comment.parent_comment_id.nil?

    errors.add(:parent_comment_id, 'cannot comment on a reply')
  end
end
