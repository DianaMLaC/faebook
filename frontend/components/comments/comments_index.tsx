import React, { useState } from "react"
import CommentContainer from "./comment"

function Comments({ comments, parentType }): React.ReactElement {
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
      <ul className="comments-list">
        {displayedComments.map((comment) => (
          <CommentContainer key={comment.id} comment={comment} parentType={parentType} />
        ))}
      </ul>
    </div>
  )
}

export default Comments
