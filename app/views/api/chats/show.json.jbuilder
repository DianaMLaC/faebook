json.extract! @chat, :id, :name, :created_at, :updated_at
json.id @chat.id
json.name @chat.name
json.createdAt @chat.created_at

json.messages @chat.messages do |message|
  json.partial! 'api/messages/message', message: message
end
