json.id comment.id
json.text comment.text
json.createdAt comment.created_at
json.postId comment.post_id
json.parentCommentId comment.parent_comment_id
json.author do 
  json.id comment.author_id
  json.displayName comment.author.display_name
end
json.replies comment.replies do |reply|
  json.partial! 'comment', comment: reply
end
