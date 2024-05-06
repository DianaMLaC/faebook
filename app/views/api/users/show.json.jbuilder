json.extract! @user, :id, :first_name, :last_name, :email, :date_of_birth  
json.displayName @user.display_name  

if @user.profile_photo_url.present?
  json.profilePhotoUrl @user.profile_photo_url
end

if @user.cover_photo_url.present?
  json.coverPhotoUrl @user.cover_photo_url
end

if @user.intro.present?
  json.intro do
    json.extract! @user.intro, :work, :education, :location, :relationship
  end
else
  json.intro {}
end
