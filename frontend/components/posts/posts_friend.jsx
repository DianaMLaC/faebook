import React from "react"

const PostsFriend = ({ friend }) => {
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
          <div>No photo to show</div>
        )}
      </div>
      <div className="posts-friend-name">{friend.displayName}</div>
    </div>
  )
}

export default PostsFriend
