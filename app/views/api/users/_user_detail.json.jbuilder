json.id user.id
json.email user.email
json.displayName user.display_name
json.dateOfBirth user.date_of_birth
json.profilePhotoUrl (user.profile_photo.image.url if user.profile_photo&.image&.attached?)

json.albums @user.albums do |album|
  json.id album.id
  json.name album.name
  json.photos album.photos do |photo|
    json.id photo.id
    json.url (photo.image.url if photo.image.attached?)
    json.description photo.description
  end
end

json.posts @user.posts do |post|
  json.id post.id
  json.body post.body
  json.createdAt post.created_at
  json.comments post.comments do |comment|
    json.id comment.id
    json.text comment.text
    json.createdAt comment.created_at
    json.likes comment.likes do |like|
      json.liker do
        json.partial! 'api/users/user', user: like.liker
      end
    end
  end
  json.likes post.likes do |like|
    json.liker do
      json.partial! 'api/users/user', user: like.liker
    end
  end
end

json.friends user.friends do |friend|
  json.partial! 'api/users/user', user: friend
end

json.friendRequests user.friend_requests do |friend_request|
  json.partial! 'api/users/user', user: friend_request
end
