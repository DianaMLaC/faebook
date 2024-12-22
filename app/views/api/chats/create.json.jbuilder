json.extract! @chat, :id, :name, :created_at, :updated_at
json.id @chat.id
json.name @chat.name
json.createdAt @chat.created_at


json.sender do
  json.extract! @sender, :id, :name, :profile_photo_url, :email
end

json.receiver do
  json.extract! @recipient, :id, :name, :profile_photo_url, :email
end

# Include messages
json.messages @chat.messages do |message|
  json.partial! 'api/messages/message', message: message
end
