import React, { useState } from "react"
import { BiSolidLike } from "react-icons/bi"

function Likes({ likes, position }): React.ReactElement {
  const likesNumber = likes.length

  return (
    <div className="likes-details">
      <div className="likes-details-icon">
        <BiSolidLike />
      </div>
      <span className="likes-details-count">{likesNumber}</span>
    </div>
  )
}

export default Likes
