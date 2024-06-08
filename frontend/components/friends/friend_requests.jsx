import React from "react"
import Request from "./request"

const FriendRequests = ({ requests }) => {
  return (
    <ul className="friend-requests-display">
      {requests && requests.map((friend) => <Request key={friend.friendshipId} friend={friend} />)}
    </ul>
  )
}

export default FriendRequests
