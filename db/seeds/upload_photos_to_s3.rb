require 'aws-sdk-s3'
require 'json'
require_relative '../../config/environment'
require_relative '../seed_content'

BUCKET_NAME = 'faebook' # Replace with your bucket name
LOCAL_PHOTOS_DIR = 'db/seeds/fae-pics/' # Local directory containing photos
REMOTE_BASE_PATH = 'faebook-seeds/' # S3 folder where photos will be uploaded
OUTPUT_JSON = 'db/seeds/photos.json' # Output JSON file with uploaded URLs
photo_captions = PHOTO_CAPTIONS

# Helper to check if photo exists in S3
def photo_exists_in_s3?(s3, bucket, key)
  # s3 = Aws::S3::Client.new(
  #   region: 'eu-west-2', # e.g., 'eu-west-2'
  #   access_key_id: Rails.application.credentials.dig(:aws, :access_key_id),
  #   secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key)
  # )
  s3.head_object(bucket:, key:)
  true
rescue Aws::S3::Errors::NotFound
  false
end

# Upload a single photo to S3
def upload_photo(s3, bucket, local_path, s3_key)
  s3.put_object(bucket:, key: s3_key, body: File.open(local_path)) unless photo_exists_in_s3?(s3, bucket, s3_key)
  "https://#{bucket}.s3.amazonaws.com/#{s3_key}" # Return the AWS link
end

# Process covers
def process_covers(s3, bucket, local_dir)
  covers_dir = "#{local_dir}/covers"
  covers_data = []

  Dir.glob("#{covers_dir}/*.jpg").each do |cover_file|
    user = File.basename(cover_file, '.*').to_sym # Extract user name (e.g., "tory")
    cover_key = "faebook-seeds/covers/#{File.basename(cover_file)}"
    aws_link = upload_photo(s3, bucket, cover_file, cover_key)
    covers_data << [user, aws_link] # Store as tuple [user, link]
  end

  covers_data
end

# Process user photos
def process_user_photos(s3, bucket, user_dir, captions)
  user = File.basename(user_dir).to_sym # Extract user name (e.g., "tory")
  user_photos = []

  Dir.glob("#{user_dir}/*.jpg").each do |photo_file|
    photo_number = File.basename(photo_file, '.*').to_i # Extract number (e.g., 1 from "1.jpg")
    photo_key = "faebook-seeds/#{user}/#{File.basename(photo_file)}"
    aws_link = upload_photo(s3, bucket, photo_file, photo_key)

    # Add photo to user's photo data
    user_photos << if captions[user] && captions[user][photo_number]
                     {
                       description: captions[user][photo_number],
                       url: aws_link
                     }
                   else
                     { photo_number => aws_link } # No caption, use tuple
                   end
  end

  [user, user_photos] # Return user data as [user, photos array]
end

# Main method to process all photos and generate JSON
def generate_json(s3, bucket, local_dir, captions)
  photos_data = { covers: [] }

  # Process covers
  photos_data[:covers] = process_covers(s3, bucket, local_dir)

  # Process user directories
  Dir.glob("#{local_dir}/*").each do |user_dir|
    next if File.basename(user_dir) == 'covers' # Skip covers directory

    user, user_photos = process_user_photos(s3, bucket, user_dir, captions)
    photos_data[user] = user_photos
  end

  # Write JSON to file
  File.open(OUTPUT_JSON, 'w') { |f| f.write(JSON.pretty_generate(photos_data)) }
end

# AWS S3 Client
s3 = Aws::S3::Client.new(
  region: 'eu-west-2', # e.g., 'eu-west-2'
  access_key_id: Rails.application.credentials.dig(:aws, :access_key_id),
  secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key)
)

generate_json(s3, BUCKET_NAME, LOCAL_PHOTOS_DIR, photo_captions)

# def upload_photo(file_path, bucket, remote_path)
#   s3 = Aws::S3::Client.new(
#     region: 'eu-west-2', # e.g., 'eu-west-2'
#     access_key_id: Rails.application.credentials.dig(:aws, :access_key_id),
#     secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key)
#   )
#   if photo_exists_in_s3?(bucket, remote_path)
#     puts "Photo already exists in S3: #{remote_path}"
#     return "https://#{bucket}.s3.amazonaws.com/#{remote_path}"
#   end

#   s3.put_object(bucket:, key: remote_path, body: File.open(file_path))
#   puts "Uploaded: #{remote_path}"
#   "https://#{bucket}.s3.amazonaws.com/#{remote_path}"
# end

# def process_photos
#   photo_urls = {}

#   # Traverse the local directory
#   Dir.glob("#{LOCAL_PHOTOS_DIR}**/*.{jpg,jpeg,png,webp}") do |file_path|
#     # Extract user name and photo name from the path
#     relative_path = file_path.sub("#{LOCAL_PHOTOS_DIR}", '')
#     user_name = relative_path.split('/')[0] # Assumes structure: `twins/tory/1.webp`
#     photo_name = File.basename(file_path)
#     remote_path = "#{REMOTE_BASE_PATH}#{relative_path}"

#     # Upload photo to S3
#     url = upload_photo(file_path, BUCKET_NAME, remote_path)

#     # Add the photo URL to the JSON structure
#     photo_urls[user_name] ||= []
#     photo_urls[user_name] << { description: photo_name.split('.').first, url: }
#   end

#   # Write the JSON file
#   File.open(OUTPUT_JSON, 'w') do |file|
#     file.write(JSON.pretty_generate(photo_urls))
#   end

#   puts "Photo URLs saved to #{OUTPUT_JSON}"
# end

# # Run the upload process
# process_photos
