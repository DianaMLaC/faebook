# == Schema Information
#
# Table name: comments
#
#  id         :uuid             not null, primary key
#  text       :string           not null
#  author_id  :uuid             not null
#  post_id    :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
  belongs_to :post,
             foreign_key: :post_id,
             class_name: 'Post'

  belongs_to :author,
             foreign_key: :author_id,
             class_name: 'User'
end
