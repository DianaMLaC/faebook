import React from "react"
import FriendAccepted from "./friend_accepted"

const FriendsIndex = ({ friends }) => {
  return (
    <ul className="all-friends-display">
      {friends && friends.map((friend) => <FriendAccepted key={friend.id} friend={friend} />)}
    </ul>
  )
}

export default FriendsIndex
