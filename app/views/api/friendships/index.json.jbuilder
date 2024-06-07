json.friends do
  json.accepted @friends.map do |friend|
    json.partial! 'api/users/user', user: friend
  end
  json.requests @pending_friends do |friend|
    json.partial! 'api/users/user', user: friend
  end
end

json.existing_relation @existing_relation
