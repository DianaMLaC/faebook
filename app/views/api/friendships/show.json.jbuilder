json.friendshipId @friendship.id
json.friendshipStatus @friendship.is_accepted
json.user json.partial! 'api/users/user', user: @receiver