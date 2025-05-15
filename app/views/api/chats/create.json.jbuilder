json.id @chat.id
json.name @chat.name
json.updatedAt @chat.updated_at
json.createdAt @chat.created_at

json.receiver do
  json.partial! 'api/users/user', user: @recipient
end

# Include messages
json.messages @chat.messages do |message|
  json.partial! 'api/messages/message', message: message
end
