json.comments @comments do |comment| 
  json.id comment.id
  json.text comment.text 
  json.createdAt comment.created_at
  json.postId comment.post_id
  json.author do 
    json.id comment.author_id
    json.displayName comment.author.display_name
  end 
end 
