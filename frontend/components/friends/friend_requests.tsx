import React from "react"
import Request from "./request"
import { FriendshipFriend } from "../../utils/types"

function FriendRequests({ requests }): React.ReactElement {
  return (
    <ul className="friend-requests-display">
      {requests &&
        requests.map(
          (friend: FriendshipFriend): React.ReactElement => (
            <Request key={friend.friendshipId} friend={friend} />
          )
        )}
    </ul>
  )
}

export default FriendRequests
