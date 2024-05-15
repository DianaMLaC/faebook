import React from "react"
import { FaUserFriends, FaRegComment } from "react-icons/fa"
import { AiOutlineLike } from "react-icons/ai"
import { PiShareFat } from "react-icons/pi"

const Post = () => {
  return (
    <div>
      <header className="post-header">
        <div className="post-header-left">
          <div className="avatar"></div>
          <div className="post-details">
            <div className="post-user-display-name"></div>
            <div>
              <div className="post-created-at"></div>
              <FaUserFriends />
            </div>
          </div>
        </div>
        <div className="more-button">...</div>
      </header>

      <div className="post-content"></div>
      <div className="post-action-buttons">
        <div className="like">
          <AiOutlineLike />
          <div>Like</div>
        </div>
        <div className="comment">
          <FaRegComment />
          <div>Comment</div>
        </div>
        <div className="share">
          <PiShareFat />
          <div>Share</div>
        </div>
      </div>
      <div className="post-comment">
        <div className="comment-avatar"></div>
        <div className="comment-input-bar"></div>
      </div>
    </div>
  )
}
