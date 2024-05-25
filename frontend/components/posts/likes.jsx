import React from "react"

const Likes = ({ likes }) => {
  return (
    <div className="likes-details">
      {likes.map((like) => (
        <span key={like.id}>
          <img
            src={like.user.profilePhotoUrl}
            alt={like.user.name}
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          />
          {like.user.name}
        </span>
      ))}
    </div>
  )
}

export default Likes
