json.id @post.id
json.body @post.body
json.createdAt @post.created_at
json.author do 
  json.id @post.author_id
  json.displayName @post.author.display_name
end
