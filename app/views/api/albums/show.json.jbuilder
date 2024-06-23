json.id @album.id
json.name @album.name

if @album.photos.present?
  json.photos @album.photos do |photo|
    json.partial! 'api/photos/photo', photo: photo
  end
end
