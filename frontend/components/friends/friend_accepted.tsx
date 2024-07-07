import React from "react"

function FriendAccepted({ friend }): React.ReactElement {
  return (
    <div className="friend-accepted-container">
      <div className="friend-accepted-photo">
        {friend.profilePhotoUrl ? (
          <img className="friend-cover-" src={friend.profilePhotoUrl} alt={friend.displayName} />
        ) : (
          <img
            className="missing-profile-photo"
            src="/assets/images/missing-profile-pic.png"
            alt="Faebook"
          />
        )}
      </div>
      <div className="friend-accepted-name">{friend.displayName}</div>
    </div>
  )
}

export default FriendAccepted
