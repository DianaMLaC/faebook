json.array!(@photos) do |photo|
  json.id photo.id
  json.description photo.description
  json.createdAt photo.created_at
  json.url (url_for(photo.image) if photo.image.attached?)
end
