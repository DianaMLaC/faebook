import React from "react"
import Request from "./request"
import { FriendshipFriend } from "../../utils/types"

function FriendRequests({ requests }): React.ReactElement {
  return (
    <>
      {requests && requests.length > 0 ? (
        <ul className="friend-requests-display">
          {requests &&
            requests.map(
              (friend: FriendshipFriend): React.ReactElement => (
                <Request key={friend.friendshipId} friend={friend} />
              )
            )}
        </ul>
      ) : (
        <div className="no-info-to-show">
          <p>No friend requests to show</p>
        </div>
      )}
    </>
  )
}

export default FriendRequests
