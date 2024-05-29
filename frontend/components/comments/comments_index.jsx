import React, { useState } from "react"
import Comment from "./comment"

const Comments = ({ comments }) => {
  // console.log("comments:", comments)
  const [showAll, setShowAll] = useState(false)
  // console.log("comments list:", comments)
  const displayedComments = showAll ? comments : comments.slice(-2).reverse()
  return (
    <div>
      {comments.length > 2 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View More Comments"}
        </button>
      )}
      <ul className="posts-list">
        {displayedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  )
}

export default Comments
