json.extract! @user, :id, :name, :email, :date_of_birth  
json.displayName @user.display_name  

if @user.profile_photo_url.present?
  json.profilePhotoUrl @user.profile_photo_url
end

if @user.cover_photo_url.present?
  json.coverPhotoUrl @user.cover_photo_url
end

json.intro do
  json.extract! @user.intro, :workplace, :education, :location, :relationship
end
