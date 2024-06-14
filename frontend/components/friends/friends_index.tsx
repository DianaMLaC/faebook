import React from "react"
import FriendAccepted from "./friend_accepted"

interface FriendsProps {
  friends: any
}

const FriendsIndex: React.FC<FriendsProps> = ({ friends }) => {
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

function MyComponent({ friends }: FriendsProps) {
  return <div></div>
}
