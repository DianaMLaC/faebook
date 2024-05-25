import React, { useState } from "react"
// import { BiLike, BiSolidLike } from "react-icons/bi"

const Likes = ({ likes }) => {
  const [likesNumber, setLikesNumber] = useState(likes.length)
  return (
    <div className="likes-details">
      <div className="likes-details-icon">
        <img
          className="like"
          src={require("../../../app/assets/images/like.png").default}
          alt="Like"
        />
      </div>
      <span className="likes-details-count">Likes: {likesNumber}</span>
    </div>
  )
}

export default Likes
