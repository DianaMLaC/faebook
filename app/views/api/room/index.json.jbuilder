json.array! @rooms do |room|
  json.extract! room, :id, :description, :created_at, :updated_at
end
