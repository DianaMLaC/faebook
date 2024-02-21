json.posts @posts do |post| 
  json.id post.id
  json.text post.text
  json.createdAt post.created_at
  json.author do 
    json.id post.author_id
    json.displayName post.author.display_name
  end 
end
