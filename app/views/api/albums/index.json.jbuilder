json.array!(@albums) do |album|
  json.extract! album, :id, :name
  json.cover_photo_url album.cover_photo_url
  json.photos_count album.photos.count
end
