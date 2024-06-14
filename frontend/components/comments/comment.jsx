import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/auth"
import { usePosts } from "../../context/posts"
import Likes from "../posts/likes"
import { toggleLike } from "../../utils/post_and_comments"
import { formatCommentDate } from "../../utils/helpers"
import Comments from "./comments_index"
import CommentForm from "./comment_form"

const Comment = ({ comment }) => {
  const { currentUser } = useAuth()
  const { deleteLikeFromComment, addLikeToComment, addReplyToComment } = usePosts()
  const [likes, setLikes] = useState(comment.likes || [])
  const [repliesList, setRepliesList] = useState(comment.replies || [])
  const [repliesNumber, setRepliesNumber] = useState(comment.replies.length || 0)
  const [author, setAuthor] = useState(comment.author || [])
  const [toggleReplyForm, setToggleReplyForm] = useState(false)
  const [toggleReplies, setToggleReplies] = useState(false)
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    comment.likes.some((like) => like.liker.id === currentUser.id)
  )

  const toggleRepliesVisibility = () => {
    setToggleReplies((prev) => !prev)
  }

  useEffect(() => {
    setLikedByCurrentUser(comment.likes.some((like) => like.liker.id === currentUser.id))
    setRepliesNumber(comment.replies.length)
    setLikes(comment.likes)
    setRepliesList(comment.replies)
    // setReplyLikes(comment.replies.likes)
    setAuthor(comment.author)
  }, [comment])

  const repliesLink = (count) => {
    const replyText = count === 1 ? "View 1 reply" : `View all ${count} replies`
    return toggleReplies ? null : (
      <div className="view-replies-link" onClick={toggleRepliesVisibility}>
        {replyText}
      </div>
    )
  }

  const handleCommentLike = async (e) => {
    e.preventDefault()
    const likeable = "comments"
    const likeResponse = await toggleLike(likeable, comment.id)

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

  const handleNewReply = useCallback(
    (newReply) => {
      addReplyToComment(comment.postId, comment.id, newReply)
      setRepliesList((prevReplies) => [...prevReplies, newReply])
    },
    [comment.postId, comment.id, addReplyToComment]
  )

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
            <div className="reply" onClick={() => setToggleReplyForm(true)}>
              Reply
            </div>
          </div>
          <div>{likes.length > 0 && <Likes likes={likes} position={"comment"} />}</div>
        </div>

        <div className="replies-number"> {repliesNumber > 0 && repliesLink(repliesNumber)}</div>

        <div>
          {toggleReplyForm && (
            <div className="reply-form">
              <div className="reply-avatar">
                {currentUser.profilePhotoUrl && (
                  <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
                )}
              </div>
              <CommentForm
                onCommentSubmit={handleNewReply}
                toggle={setToggleReplyForm}
                parentCommentId={comment.id}
                postId={comment.postId}
              />
            </div>
          )}
        </div>
        {toggleReplies && <Comments comments={repliesList} />}
      </div>
    </div>
  )
}

export default Comment
