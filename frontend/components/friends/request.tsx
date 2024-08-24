import React, { useState } from "react"
import { updateFriendship, deleteFriendship } from "../../utils/axios"
import { useFriends } from "../../context/friends"
import { icon } from "../../utils/helpers"

function Request({ friend }): React.ReactElement {
  const { addAcceptedFriend, removePendingFriendship } = useFriends()

  const acceptFriendship = async (e) => {
    e.preventDefault()

    try {
      const acceptFriendship = await updateFriendship(friend.friendshipId)
      if (acceptFriendship.friendshipStatus) {
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
          <img className="missing-profile-photo" src={icon.noProfilePhoto} alt="Faebook" />
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
