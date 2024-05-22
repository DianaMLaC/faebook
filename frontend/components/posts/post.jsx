import React, { useState } from "react"
import { FaUserFriends, FaRegComment } from "react-icons/fa"
import { AiOutlineLike } from "react-icons/ai"
import { PiShareFat } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { fetchUserProfile } from "../../utils/profile"

const Post = ({ post }) => {
  const { currentUser } = useAuth()

  // useEffect(() => {
  //   if (authorId === null) {
  //     console.log("post author id not found")
  //     return
  //   }

  //   async function fetchProfile() {
  //     try {
  //       const postUserData = await fetchUserProfile(authorId)
  //       console.log("postUserData", { postUserData })
  //       setPostUser(postUserData)
  //       console.log("postUserState:", postUser)
  //     } catch (err) {
  //       console.error("Error in fetching the User Profile for Post", err)
  //     }
  //   }

  //   fetchProfile()
  // }, [authorId, setPostUser])

  // useEffect(() => {
  //   console.log("Updated postUser state:", postUser)
  // }, [postUser])

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
              <div className="post-created-at">{post.createdAt}</div>

              <FaUserFriends />
            </div>
          </div>
        </div>
        <div className="more-button">...</div>
      </header>

      <div className="post-content">{post.body}</div>
      <div className="post-action-buttons">
        <div className="like">
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
