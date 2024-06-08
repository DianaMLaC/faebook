json.friends do
  json.accepted @friendships do |friendship|
    json.friendshipId friendship[:friendship_id]
    json.friendshipStatus friendship[:friendship_status]
    json.partial! 'api/users/user', user: friendship[:user]
  end
  json.requests @pending_friendships do |friendship|
    json.friendshipId friendship[:friendship_id]
    json.friendshipStatus friendship[:friendship_status]
    json.partial! 'api/users/user', user: friendship[:user]
  end
end

json.existing_relation @existing_relation
