require 'aws-sdk-s3'
require 'json'
require_relative '../../config/environment'
require_relative '../seed_content'

BUCKET_NAME = 'faebook'
LOCAL_PHOTOS_DIR = 'db/seeds/fae-pics/'
REMOTE_BASE_PATH = 'faebook-seeds/'
OUTPUT_JSON = 'db/seeds/photos.json'
photo_captions = PHOTO_CAPTIONS

def photo_exists_in_s3?(s3, bucket, key)
  s3.head_object(bucket:, key:)
  true
rescue Aws::S3::Errors::NotFound
  false
end

def content_type_for_file(file_path)
  case File.extname(file_path).downcase
  when '.jpg', '.jpeg' then 'image/jpeg'
  when '.png' then 'image/png'
  else 'application/octet-stream'
  end
end

def upload_photo(s3, bucket, local_path, s3_key)
  return "https://#{bucket}.s3.amazonaws.com/#{s3_key}" if photo_exists_in_s3?(s3, bucket, s3_key)

  s3.put_object(
    bucket:,
    key: s3_key,
    body: File.open(local_path),
    content_type: content_type_for_file(local_path),
    acl: 'public-read' # Make sure the image is public and renders in the browser
  )
  "https://#{bucket}.s3.amazonaws.com/#{s3_key}"
end

def process_covers(s3, bucket, local_dir)
  covers_dir = "#{local_dir}/covers"
  covers_data = {}

  Dir.glob("#{covers_dir}/*.jpg").each do |cover_file|
    user = File.basename(cover_file, '.*').to_sym
    cover_key = "#{REMOTE_BASE_PATH}covers/#{File.basename(cover_file)}"
    aws_link = upload_photo(s3, bucket, cover_file, cover_key)
    covers_data[user] = aws_link
  end

  covers_data
end

def process_user_photos(s3, bucket, user_dir, captions)
  user = File.basename(user_dir).to_sym
  user_photos = []

  Dir.glob("#{user_dir}/*.jpg").each do |photo_file|
    photo_number = File.basename(photo_file, '.*').to_i
    photo_key = "#{REMOTE_BASE_PATH}#{user}/#{File.basename(photo_file)}"
    aws_link = upload_photo(s3, bucket, photo_file, photo_key)

    user_photos << {
      description: captions[user]&.dig(photo_number) || "Photo #{photo_number}",
      url: aws_link
    }
  end

  { user => user_photos }
end

def generate_json(s3, bucket, local_dir, captions)
  photos_data = { covers: process_covers(s3, bucket, local_dir) }

  Dir.glob("#{local_dir}/*").each do |user_dir|
    next if File.basename(user_dir) == 'covers'

    user_data = process_user_photos(s3, bucket, user_dir, captions)
    photos_data.merge!(user_data)
  end

  File.open(OUTPUT_JSON, 'w') { |f| f.write(JSON.pretty_generate(photos_data)) }
end

s3 = Aws::S3::Client.new(
  region: 'eu-west-2',
  access_key_id: Rails.application.credentials.dig(:aws, :access_key_id),
  secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key)
)

generate_json(s3, BUCKET_NAME, LOCAL_PHOTOS_DIR, photo_captions)
puts 'Photos uploaded and JSON generated.'
