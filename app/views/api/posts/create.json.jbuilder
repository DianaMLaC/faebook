json.id @post.id
json.text @post.text
json.createdAt @post.created_at
json.author do 
  json.id @post.author.id
  json.fullName @post.author.first_name + @post.author.last_name
end
