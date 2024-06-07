import React from "react"

const Request = ({ friend }) => {
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
          <div>No photo to show</div>
        )}
      </div>
      <div className="friend-request-name">{friend.displayName}</div>
      <div className="friend-request-buttons">
        <div className="friend-request-accept">Confirm</div>
        <div className="friend-request-remove">Remove</div>
      </div>
    </div>
  )
}

export default Request
