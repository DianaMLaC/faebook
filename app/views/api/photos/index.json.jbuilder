json.array!(@photos) do |photo|
  json.id photo.id
  json.description photo.description
  json.createdAt photo.created_at
  json.url photo.photo_url
end
