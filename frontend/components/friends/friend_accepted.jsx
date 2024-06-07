import React from "react"

const FriendAccepted = ({ friend }) => {
  return (
    <div className="friend-accepted-container">
      <div className="friend-accepted-photo">
        {friend.profilePhotoUrl ? (
          <img
            className="photo-cover-image"
            src={friend.profilePhotoUrl}
            alt={friend.displayName}
          />
        ) : (
          <div>No photo to show</div>
        )}
      </div>
      <div className="friend-accepted-name">{friend.displayName}</div>
    </div>
  )
}

export default FriendAccepted
