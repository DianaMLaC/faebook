json.id @post.id
json.text @post.text
json.createdAt @post.created_at
json.author do 
  json.id @user.id
  json.displayName @user.display_name
end
