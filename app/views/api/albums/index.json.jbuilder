json.array!(@albums) do |album|
  json.extract! album, :id, :name
  json.coverPhotoUrl album.cover_photo_url
  json.photosCount album.photos.count
  json.photos album.photos
end
