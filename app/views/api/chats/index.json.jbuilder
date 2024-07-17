json.array! @chats do |chat|
  json.extract! chat, :id, :name, :created_at, :updated_at
end
