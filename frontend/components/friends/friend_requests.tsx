import React from "react"
import Request from "./request"
import { Friendship } from "../../utils/types"

function FriendRequests({ requests }): React.ReactElement {
  return (
    <ul className="friend-requests-display">
      {requests &&
        requests.map(
          (friend: Friendship): React.ReactElement => (
            <Request key={friend.friendshipId} friend={friend} />
          )
        )}
    </ul>
  )
}

export default FriendRequests
