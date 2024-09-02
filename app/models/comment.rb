# == Schema Information
#
# Table name: comments
#
#  id                :uuid             not null, primary key
#  text              :string           not null
#  author_id         :uuid             not null
#  post_id           :uuid
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  parent_comment_id :uuid
#  photo_id          :uuid
#
class Comment < ApplicationRecord
  validates :text, presence: true
  validate :cannot_comment_on_reply
  validate :post_or_photo_present

  belongs_to :post, foreign_key: :post_id, class_name: 'Post', optional: true
  belongs_to :photo, foreign_key: :photo_id, class_name: 'Photo', optional: true
  belongs_to :author, foreign_key: :author_id, class_name: 'User'

  has_many :replies, dependent: :destroy, foreign_key: :parent_comment_id, class_name: 'Comment'
  belongs_to :parent_comment, class_name: 'Comment', optional: true

  has_many :likes, dependent: :destroy, as: :likeable

  private

  def cannot_comment_on_reply
    return unless parent_comment_id.present? && parent_comment&.parent_comment_id.present?

    errors.add(:base,
               'Cannot comment on a reply')
  end

  def post_or_photo_present
    if post_id.nil? && photo_id.nil?
      errors.add(:base, 'Comment must belong to either a post or a photo')
    elsif post_id.present? && photo_id.present?
      errors.add(:base, 'Comment cannot belong to both a post and a photo')
    end
  end
end
