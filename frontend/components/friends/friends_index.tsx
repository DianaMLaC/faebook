import React from "react"
import FriendAccepted from "./friend_accepted"

function FriendsIndex({ friends }): React.ReactElement {
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
