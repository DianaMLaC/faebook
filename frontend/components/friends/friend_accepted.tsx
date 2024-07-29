import React from "react"
import { useNavigate } from "react-router-dom"

function FriendAccepted({ friend }): React.ReactElement {
  const navigate = useNavigate()

  const handleFriendClick = () => {
    navigate(`/profile-page/${friend.id}/posts`)
  }
  return (
    <div className="friend-accepted-container" onClick={handleFriendClick}>
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
