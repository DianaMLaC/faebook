import React from "react"

function PostsFriend({ friend }): React.ReactElement {
  return (
    <div className="posts-friend-container">
      <div className="posts-friend-photo">
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
      <div className="posts-friend-name">{friend.displayName}</div>
    </div>
  )
}

export default PostsFriend
