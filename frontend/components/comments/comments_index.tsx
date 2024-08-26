import React, { useState } from "react"
import CommentContainer from "./comment"

function Comments({ comments, parentType }): React.ReactElement {
  const [showAll, setShowAll] = useState(false)
  const displayedComments = showAll ? comments : comments.slice(-3).reverse()
  return (
    <div>
      {comments.length > 3 && (
        <button className="comments-display" onClick={() => setShowAll(!showAll)}>
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
