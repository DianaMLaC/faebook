import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import Likes from "../posts/likes"

const Comment = ({ comment }) => {
  const { currentUser } = useAuth()
  const [likes, setLikes] = useState(comment.likes || [])
  const [repliesNumber, setRepliesNumber] = useState(comment.replies.length || [])
  const [author, setAuthor] = useState(comment.author || [])

  useEffect(() => {
    setLikedByCurrentUser(comment.likes.some((like) => like.liker.id === currentUser.id))
    setRepliesNumber(comment.replies.length)
    setLikes(comment.likes)
    setReplyLikes(comment.replies.likes)
    setAuthor(comment.author)
  }, [comment])

  const replies = (count) => {
    if (count === 1) {
      return <div className="view-replies-link">View 1 reply</div>
    } else {
      return <div className="view-replies-link">View all {count} replies</div>
    }
  }

  return (
    <div className="comment">
      <div className="avatar">
        {author.profilePhotoUrl && (
          <img className="profile-photo" src={author.profilePhotoUrl} alt="Profile" />
        )}
      </div>
      <div className="comment-details">
        <div className="comment-banner">
          <div className="comment-user-display-name">{author.displayName}</div>
          <div className="comment-text">{author.displayName}</div>
        </div>
        <div className="comment-footer">
          <div>
            <div className="timestamp"></div>
            <div className="like">Like</div>
            <div className="reply">Reply</div>
          </div>
          <div>{likes.length > 0 && <Likes likes={likes} position={"comment"} />}</div>
        </div>
        {repliesNumber > 0 && replies(repliesNumber)}
      </div>
    </div>
  )
}

export default Comment
