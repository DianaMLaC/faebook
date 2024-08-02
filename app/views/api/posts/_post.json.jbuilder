json.id post.id
json.body post.body
json.createdAt post.created_at.iso8601
json.author do 
  json.id post.author_id
  json.displayName post.author.display_name
  json.profilePhotoUrl post.author.profile_photo_url
end

if post.content_type.present?
  json.contentType post.content_type

  if post.content_type == "Photo" && post.content.present?

    json.content do
      json.partial! 'api/photos/photo', photo: post.content
    end

  elsif post.content_type == "PostUrl" && post.content.present?

    json.content do
      json.partial! 'api/post_urls/post_url', post_url: post.content
    end

  end

end

json.likes post.likes do |like|
  json.partial! 'api/likes/like', like: like
end

json.comments post.comments do |comment|
  json.partial! 'api/comments/comment', comment: comment
end
