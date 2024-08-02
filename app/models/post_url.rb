class PostUrl < ApplicationRecord
  has_many :posts, as: :content
end
