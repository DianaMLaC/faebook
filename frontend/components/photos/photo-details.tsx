import React, { useState, useEffect, useCallback } from "react"
import { FaRegComment } from "react-icons/fa"
import { BiSolidLike, BiLike } from "react-icons/bi"
import { PiShareFat } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { usePhotos } from "../../context/photos"

import { toggleLike, fetchTopLevelComments } from "../../utils/post_and_comments"
import Likes from "../posts/likes"
import Comments from "../comments/comments_index"
import CommentForm from "../comments/comment_form"
import { formatPostDate } from "../../utils/helpers"

function PhotoDetails({ photo }) {
  const { currentUser, profileUser } = useAuth()
  const { addLikeToPhoto, deleteLikeFromPhoto, addCommentToPhoto } = usePhotos()
  const [likes, setLikes] = useState(photo.likes || [])
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    (photo.likes && photo.likes.some((like) => like.liker.id === currentUser?.id)) || false
  )
  const [comments, setComments] = useState(photo.comments || [])
  const [toggleCommenting, setToggleCommenting] = useState(false)

  const photoTimeStamp = formatPostDate(photo.createdAt)

  useEffect(() => {
    async function fetchCommentsData() {
      const commentsData = await fetchTopLevelComments(photo.id, "photo")
      setComments(commentsData.comments || [])
    }

    fetchCommentsData()
    setLikedByCurrentUser(
      photo.likes && photo.likes.some((like) => like.liker.id === currentUser?.id)
    )
    setLikes(photo.likes || [])
  }, [photo.id, currentUser?.id, photo.likes])

  const handlePhotoLike = async (e) => {
    e.preventDefault()
    const likeable = "photos"
    const likeResponse = await toggleLike(likeable, photo.id)

    if (likeResponse) {
      if (likedByCurrentUser) {
        setLikes(likes.filter((like) => like.id !== likeResponse.id))
        deleteLikeFromPhoto(photo.id, likeResponse.id)
      } else {
        setLikes([...likes, likeResponse])
        addLikeToPhoto(photo.id, likeResponse)
      }
      setLikedByCurrentUser(!likedByCurrentUser)
    }
  }

  const handleNewComment = useCallback(
    (newComment) => {
      setComments((prevComments) => [...prevComments, newComment])
      addCommentToPhoto(photo.id, newComment)
    },
    [photo.id, addCommentToPhoto]
  )

  return (
    <div className="photo-details-container">
      <header className="photo-header">
        <div className="photo-header-left">
          <div className="avatar">
            {profileUser?.profilePhotoUrl && (
              <img className="profile-photo" src={profileUser.profilePhotoUrl} alt="Profile" />
            )}
          </div>
          <div className="photo-details-div">
            <div className="photo-user-display-name">{profileUser?.displayName}</div>
            <div className="photo-visibility">
              <div className="photo-created-at">{photoTimeStamp}</div>
            </div>
          </div>
        </div>
        {/* <div className="more-button">...</div> */}
      </header>

      <div className="photo-description">{photo.description}</div>

      <div className="likes-container">
        {likes.length > 0 ? <Likes likes={likes} position={"photo"} /> : <p></p>}
      </div>

      <div className="photo-action-buttons">
        <div className={likedByCurrentUser ? "liked" : "like"} onClick={handlePhotoLike}>
          {likedByCurrentUser ? <BiSolidLike /> : <BiLike />}
          <div className="action-name">Like</div>
        </div>
        <div className="comment">
          <FaRegComment />
          <div className="action-name">Comment</div>
        </div>
        <div className="share">
          <PiShareFat />
          <div className="action-name">Share</div>
        </div>
      </div>

      {comments.length > 0 ? <Comments comments={comments} /> : <p></p>}

      <div className="photo-comment">
        <div className="comment-avatar">
          {currentUser?.profilePhotoUrl && (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          )}
        </div>

        {toggleCommenting ? (
          <CommentForm
            onCommentSubmit={handleNewComment}
            toggle={setToggleCommenting}
            parentCommentId={null}
            itemId={photo.id}
            itemType="photo"
          />
        ) : (
          <div className="comment-input-bar" onClick={() => setToggleCommenting(true)}>
            Write a comment...
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoDetails