json.id user.id
json.email user.email
json.displayName user.display_name
json.dateOfBirth user.date_of_birth

if user.profile_photo_url.present?
  json.profilePhotoUrl user.profile_photo_url
end

if user.cover_photo_url.present?
  json.coverPhotoUrl user.cover_photo_url
end
