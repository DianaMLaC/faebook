import React, { useState } from "react"
// import { BiLike, BiSolidLike } from "react-icons/bi"

const Likes = ({ likes, position }) => {
  const [likesNumber, setLikesNumber] = useState(likes.length)

  // if (position === "post") {
  return (
    <div className="likes-details">
      <div className="likes-details-icon">
        <img className="like" src={"/assets/images/like.png"} alt="Like" />
      </div>
      <span className="likes-details-count">Likes: {likesNumber}</span>
    </div>
  )
  //   } else if (position === "comment") {
  //     return (
  //       <div className="likes-details">
  //         <span className="likes-details-count">Likes: {likesNumber}</span>
  //         <div className="likes-details-icon">
  //           <img
  //             className="like"
  //                       src={"/assets/images/like.png"}
  //             alt="Like"
  //           />
  //         </div>
  //         <span className="likes-details-count">Likes: {likesNumber}</span>
  //       </div>
  //     )
  //   }
}

export default Likes
