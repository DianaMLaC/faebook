
json.id comment.id
json.text comment.text
json.createdAt comment.created_at.iso8601
json.postId comment.post_id
json.parentCommentId comment.parent_comment_id

json.author do 
  json.id comment.author_id
  json.displayName comment.author.display_name
  json.profilePhotoUrl post.author.profile_photo_url
end

json.likes comment.likes do |like|
   json.partial! 'api/likes/like', like: like
end

json.replies comment.replies do |reply|
  json.partial! 'comments/comment', comment: reply
end
