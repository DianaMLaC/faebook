json.id @like.id
json.postId @like.post_id
json.liker do 
  json.id @like.liker_id
  json.displayName @like.liker.display_name
end
