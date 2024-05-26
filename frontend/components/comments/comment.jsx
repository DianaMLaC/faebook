import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import Likes from "../posts/likes"
import { formatCommentDate } from "../../utils/helpers"
import { usePosts } from "../../context/posts"
import { toggleLike } from "../../utils/post_and_comments"

const Comment = ({ comment }) => {
  const { currentUser } = useAuth()
  const { deleteLikeFromComment, addLikeToComment } = usePosts()
  const [likes, setLikes] = useState(comment.likes || [])
  const [repliesNumber, setRepliesNumber] = useState(comment.replies.length || [])
  const [author, setAuthor] = useState(comment.author || [])
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    comment.likes.some((like) => like.liker.id === currentUser.id)
  )

  useEffect(() => {
    setLikedByCurrentUser(comment.likes.some((like) => like.liker.id === currentUser.id))
    setRepliesNumber(comment.replies.length)
    setLikes(comment.likes)
    // setReplyLikes(comment.replies.likes)
    setAuthor(comment.author)
  }, [comment])

  const replies = (count) => {
    if (count === 1) {
      return <div className="view-replies-link">View 1 reply</div>
    } else {
      return <div className="view-replies-link">View all {count} replies</div>
    }
  }

  const handleCommentLike = async (e) => {
    e.preventDefault()
    const likeable = "comments"
    const likeResponse = await toggleLike(likeable, post.id)

    if (likeResponse) {
      if (likedByCurrentUser) {
        deleteLikeFromComment(comment.postId, comment.id, likeResponse.id)
        setLikes(likes.filter((like) => like.id !== likeResponse.id))
      } else {
        addLikeToComment(comment.postId, comment.id, likeResponse.id)
        setLikes([...likes, likeResponse])
      }
      setLikedByCurrentUser(!likedByCurrentUser)
    }
  }

  return (
    <div className="comment-container">
      <div className="comment-avatar">
        {author.profilePhotoUrl && (
          <img className="profile-photo" src={author.profilePhotoUrl} alt="Profile" />
        )}
      </div>
      <div className="comment-details">
        <div className="comment-banner">
          <div className="comment-user-display-name">{author.displayName}</div>
          <div className="comment-text">{comment.text}</div>
        </div>
        <div className="comment-footer">
          <div className="comment-actions">
            <div className="timestamp">{formatCommentDate(comment.createdAt)}</div>
            <div className={likedByCurrentUser ? "liked" : "like"} onClick={handleCommentLike}>
              <div className="action-name">Like</div>
            </div>
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
