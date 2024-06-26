json.id comment.id
json.text comment.text
json.createdAt comment.created_at.iso8601
json.parentCommentId comment.parent_comment_id

if comment.respond_to?(:post_id) && comment.post_id.present?
  json.postId comment.post_id
end

if comment.respond_to?(:photo_id) && comment.photo_id.present?
  json.photoId comment.photo_id
end

json.author do 
  json.id comment.author_id
  json.displayName comment.author.display_name
  json.profilePhotoUrl comment.author.profile_photo_url
end

json.likes comment.likes do |like|
  json.partial! 'api/likes/like', like: like
end

json.replies comment.replies do |reply|
  json.partial! 'api/comments/comment', comment: reply
end
