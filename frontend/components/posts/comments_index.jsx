import React, { useState } from "react"
import Comment from "./comment"

const Comments = ({ comments }) => {
  return (
    <ul className="posts-list">
      {comments && comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </ul>
  )
}

export default Comments
