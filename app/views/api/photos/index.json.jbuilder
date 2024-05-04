json.array!(@photos) do |photo|
  json.id photo.id
  json.url photo.photo_url
end
