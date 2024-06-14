import React from "react"
import FriendAccepted from "./friend_accepted"

interface FriendsProps {
  friends: any
}

function FriendsIndex({ friends }: FriendsProps) {
  return (
    <ul className="all-friends-display">
      {friends &&
        friends.map((friend) => (
          <li key={friend.id}>
            <FriendAccepted friend={friend} />
          </li>
        ))}
    </ul>
  )
}

export default FriendsIndex
