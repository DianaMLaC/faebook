import React from "react"
import FriendAccepted from "./friend_accepted"

const FriendsIndex = ({ friends }) => {
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
