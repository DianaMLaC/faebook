import React, { useState } from "react"
import { FaUserFriends, FaRegComment } from "react-icons/fa"
import { AiOutlineLike } from "react-icons/ai"
import { PiShareFat } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { createLike } from "../../utils/post"

const Post = ({ post }) => {
  const { currentUser } = useAuth()
  const [likes, setLikes] = useState(null)

  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
    return new Date(dateString).toLocaleString("en-US", options).replace(",", " at")
  }
  const postTimeStamp = formatDate(post.createdAt)

  const handleLike = async (e) => {
    e.preventDefault()
    const likeable = "posts"

    const likeResponse = await createLike(likeable, post.id)

    if (likeResponse) {
      console.log("post liked successfully")
      setLikes(likeResponse)
    }
  }

  return (
    <div className="post-container">
      <header className="post-header">
        <div className="post-header-left">
          <div className="avatar">
            {post.author.profilePhotoUrl && (
              <img className="profile-photo" src={post.author.profilePhotoUrl} alt="Profile" />
            )}
          </div>
          <div className="post-details">
            <div className="post-user-display-name">{post.author.displayName}</div>
            <div className="post-visibility">
              {/* <div className="post-created-at">May 8 at 2:08PM</div> */}
              <div className="post-created-at">{postTimeStamp}</div>

              <FaUserFriends />
            </div>
          </div>
        </div>
        <div className="more-button">...</div>
      </header>

      <div className="post-content">{post.body}</div>
      <div className="post-action-buttons">
        <div className="like" onClick={handleLike}>
          <AiOutlineLike />
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
      <div className="post-comment">
        <div className="comment-avatar">
          {" "}
          {currentUser.profilePhotoUrl && (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          )}
        </div>
        <div className="comment-input-bar">Write a comment...</div>
      </div>
    </div>
  )
}

export default Post
