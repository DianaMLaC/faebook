json.id photo.id
json.url photo.photo_url
json.description photo.description
json.albumId photo.album_id

if photo.likes.present?
  json.likes photo.likes do |like|
   json.partial! 'api/likes/like', like: like
  end
end


if photo.comments.present?
   json.comments photo.comments do |comment|
   json.partial! 'api/comments/comment', comment: comment
  end
end
