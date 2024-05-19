import React, { useState } from "react"
import { FaUserFriends, FaRegComment } from "react-icons/fa"
import { AiOutlineLike } from "react-icons/ai"
import { PiShareFat } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { fetchUserProfile } from "../../utils/profile"

const Post = () => {
  // const [postUser, setPostUser] = useState(null)
  // const { currentUser } = useAuth()
  // const authorId = post.author.id

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
    <div className="post">
      <header className="post-header">
        <div className="post-header-left">
          <div className="avatar"></div>
          <div className="post-details">
            <div className="post-user-display-name">Diana Linn</div>
            <div className="post-visibility">
              <div className="post-created-at">May 8 at 2:08PM</div>
              <FaUserFriends />
            </div>
          </div>
        </div>
        <div className="more-button">...</div>
      </header>

      <div className="post-content">
        Just finished a coding session in JavaScript, and I managed to solve a tricky bug that's
        been bothering me all week. Nothing feels better than overcoming these challenges!{" "}
      </div>
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
        <div className="comment-avatar"></div>
        <div className="comment-input-bar">Write a comment...</div>
      </div>
    </div>
  )
}

export default Post
