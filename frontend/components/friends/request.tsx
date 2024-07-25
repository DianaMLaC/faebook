import React, { useState } from "react"
import { updateFriendship, deleteFriendship } from "../../utils/profile"
import { useFriends } from "../../context/friends"
import { Friendship } from "../../utils/types"

function Request({ friend }): React.ReactElement {
  const [friendshipStatus, setFriendshipStatus] = useState(friend.friendshipStatus)
  const { addAcceptedFriend, removePendingFriendship } = useFriends()

  // console.log("friend:", friend)

  const acceptFriendship = async (e) => {
    e.preventDefault()

    try {
      const acceptFriendship = await updateFriendship(friend.friendshipId)
      if (acceptFriendship.friendshipStatus) {
        console.log("friendship accepted")
        // setFriendshipStatus(acceptFriendship.friendshipStatus)
        addAcceptedFriend(friend)
      }
    } catch (err) {
      console.error("error caught in request component from api:", err)
    }
  }

  const removeFriendship = async (e) => {
    e.preventDefault()
    try {
      const deleteFriendshipResp = await deleteFriendship(friend.friendshipId)
      if (deleteFriendshipResp) {
        removePendingFriendship(friend.friendshipId)
      }
    } catch (err) {
      console.error("error caught in request component from api:", err)
    }
  }

  return (
    <div className="friend-request-container">
      <div className="friend-request-photo">
        {friend.profilePhotoUrl ? (
          <img
            className="friend-cover-photo"
            src={friend.profilePhotoUrl}
            alt={friend.displayName}
          />
        ) : (
          <img
            className="missing-profile-photo"
            src="/assets/images/missing-profile-pic.png"
            alt="Faebook"
          />
        )}
      </div>
      <div className="friend-request-bottom">
        <div className="friend-request-name">{friend.displayName}</div>
        <div className="friend-request-mutual"></div>
        <div className="friend-request-buttons">
          <div className="friend-request-accept" onClick={acceptFriendship}>
            Confirm
          </div>
          <div className="friend-request-remove" onClick={removeFriendship}>
            Remove
          </div>
        </div>
      </div>
    </div>
  )
}

export default Request
