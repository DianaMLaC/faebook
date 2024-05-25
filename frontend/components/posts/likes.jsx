import React, { useState } from "react"
import { BiLike } from "react-icons/bi"

const Likes = ({ likes }) => {
  const [likesNumber, setLikesNumber] = useState(likes.length)
  return (
    <div className="likes-details">
      <span className="like-details-icon">
        <BiLike />
      </span>
      <span className="like-details-count">{likesNumber}</span>
    </div>
  )
}

export default Likes
