import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/auth"
import { usePosts } from "../../context/posts"
import { usePhotos } from "../../context/photos"
import Likes from "../posts/likes"
import { toggleLike } from "../../utils/post_and_comments"
import { formatCommentDate } from "../../utils/helpers"
import Comments from "./comments_index"
import CommentForm from "./comment_form"
import { Comment, User } from "../../utils/types"
import { useNavigate } from "react-router-dom"

interface CommentContainerProps {
  comment: Comment
  parentType: "post" | "photo"
}

function CommentContainer({ comment, parentType }: CommentContainerProps): React.ReactElement {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const postsContext = usePosts()
  const photosContext = usePhotos()
  const [likes, setLikes] = useState(comment.likes || [])
  const [repliesList, setRepliesList] = useState(comment.replies || [])
  const [repliesNumber, setRepliesNumber] = useState(comment.replies.length || 0)
  const [author, setAuthor] = useState(comment.author || null)
  const [toggleReplyForm, setToggleReplyForm] = useState(false)
  const [toggleReplies, setToggleReplies] = useState(false)
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    comment.likes.some((like) => like.liker.id === currentUser?.id)
  )

  const toggleRepliesVisibility = () => {
    setToggleReplies((prev) => !prev)
  }

  useEffect(() => {
    setLikedByCurrentUser(comment.likes.some((like) => like.liker.id === currentUser?.id))
    setRepliesNumber(comment.replies.length)
    setLikes(comment.likes)
    setRepliesList(comment.replies)
    setAuthor(comment.author!)
  }, [comment])

  const repliesLink = (count: number): React.ReactNode => {
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
    const likeResponse = await toggleLike(likeable, comment.id!)

    if (likeResponse) {
      if (likedByCurrentUser) {
        if (parentType === "post") {
          postsContext.deleteLikeFromComment(comment.postId!, comment.id!, likeResponse.id)
        } else {
          photosContext.deleteLikeFromComment(comment.photoId!, comment.id!, likeResponse.id)
        }
        setLikes(likes.filter((like) => like.id !== likeResponse.id))
      } else {
        if (parentType === "post") {
          postsContext.addLikeToComment(comment.postId!, comment.id!, likeResponse)
        } else {
          photosContext.addLikeToComment(comment.photoId!, comment.id!, likeResponse)
        }
        setLikes([...likes, likeResponse])
      }
      setLikedByCurrentUser(!likedByCurrentUser)
    }
  }

  const handleNewReply = useCallback(
    (newReply) => {
      if (parentType === "post") {
        postsContext.addReplyToComment(comment.postId!, comment.id!, newReply)
      } else {
        photosContext.addReplyToComment(comment.photoId!, comment.id!, newReply)
      }
      setRepliesList((prevReplies): Comment[] => [...prevReplies, newReply])
    },
    [comment.postId, comment.photoId, comment.id, parentType, postsContext, photosContext]
  )

  const handleFriendClick = () => {
    navigate(`/profile-page/${author?.id}/posts`)
  }

  return (
    <div className="comment-container">
      <div className="comment-avatar" onClick={handleFriendClick}>
        {author?.profilePhotoUrl ? (
          <img className="profile-photo" src={author.profilePhotoUrl} alt="Profile" />
        ) : (
          <img
            className="missing-profile-photo"
            src="/assets/images/missing-profile-pic.png"
            alt="Faebook"
          />
        )}
      </div>
      <div className="comment-details">
        <div className="comment-banner">
          <div className="comment-user-display-name" onClick={handleFriendClick}>
            {author?.displayName}
          </div>
          <div className="comment-text">{comment.text}</div>
        </div>
        <div className="comment-footer">
          <div className="comment-actions">
            <div className="timestamp">{formatCommentDate(comment.createdAt!)}</div>
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
                {currentUser?.profilePhotoUrl ? (
                  <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
                ) : (
                  <img
                    className="missing-profile-photo"
                    src="/assets/images/missing-profile-pic.png"
                    alt="Faebook"
                  />
                )}
              </div>
              <CommentForm
                onCommentSubmit={handleNewReply}
                toggle={setToggleReplyForm}
                parentCommentId={comment.id!}
                itemId={parentType === "post" ? comment.postId! : comment.photoId!}
                itemType={parentType}
              />
            </div>
          )}
        </div>
        {toggleReplies && <Comments comments={repliesList} parentType={parentType} />}
      </div>
    </div>
  )
}

export default CommentContainer
