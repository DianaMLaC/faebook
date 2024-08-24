import React from "react"
import { useNavigate } from "react-router-dom"
import { icon } from "../../utils/helpers"
function PostsFriend({ friend }): React.ReactElement {
  const navigate = useNavigate()

  const handleFriendClick = () => {
    navigate(`/profile-page/${friend.id}/posts`)
  }
  return (
    <div className="posts-friend-container" onClick={handleFriendClick}>
      <div className="posts-friend-photo">
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
      <div className="posts-friend-name">{friend.displayName}</div>
    </div>
  )
}

export default PostsFriend
