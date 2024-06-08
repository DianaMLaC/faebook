import React from "react"

const FriendAccepted = ({ friend }) => {
  return (
    <div className="friend-accepted-container">
      <div className="friend-accepted-photo">
        {friend.profilePhotoUrl ? (
          <img className="friend-cover-" src={friend.profilePhotoUrl} alt={friend.displayName} />
        ) : (
          <div className="no-photo">No photo to show</div>
        )}
      </div>
      <div className="friend-accepted-name">{friend.displayName}</div>
    </div>
  )
}

export default FriendAccepted
