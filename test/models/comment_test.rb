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
require 'test_helper'

class CommentTest < ActiveSupport::TestCase
end
