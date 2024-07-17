json.array! @messages do |message|
  json.extract! message, :id, :body, :created_at, :room_id
  json.sender do
    json.extract! message.sender, :id, :first_name, :last_name
  end
end
