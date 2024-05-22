import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import { FaUserFriends } from "react-icons/fa"
import { createPost } from "../../utils/post"
import { CircleLoader } from "react-spinners"

const PostForm = ({ closeModalContainer }) => {
  const { currentUser, profileUser } = useAuth()
  const [postBody, setPostBody] = useState("")
  const [formErr, setFormErr] = useState("")
  const [createdPost, setCreatedPost] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleInput = (e) => {
    setPostBody(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    let postResponse = null
    try {
      postResponse = await createPost(postBody, profileUser.id)
      setCreatedPost(postResponse)
      console.log("new post:", createdPost)
    } catch (err) {
      setFormErr(err.message)
    } finally {
      setIsUploading(false)
    }

    if (postResponse) {
      setPostBody("")
      closeModalContainer()
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <header className="post-form-header">
        <h3>Create post</h3>
        <button className="close-post-form" onClick={closeModalContainer}>
          <img
            className="close"
            src={require("../../../app/assets/images/close.png").default}
            alt="close"
          />
        </button>
      </header>
      <div className="post-form-user-details">
        <div className="avatar">
          {currentUser.profilePhotoUrl && (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          )}
        </div>
        <div>
          <div className="post-user-display-name">{currentUser.displayName}</div>
          <div className="post-form-visibility">
            <FaUserFriends />
            <span>Friends</span>
          </div>
        </div>
      </div>
      <div className="post-form-body-input">
        <textarea
          value={postBody}
          onChange={handleInput}
          placeholder="What's on your mind?"
          rows="3"
        />
      </div>
      <div className="post-form-add-on-banner">
        <p>Add to your post</p>
        {/* Place for icons and other add-ons */}
      </div>

      {formErr ? (
        <div className="form-errors">{formErr}</div>
      ) : (
        <div className="spinner">{isUploading && <CircleLoader loading={isUploading} />}</div>
      )}

      <button type="submit" className="post-submit-button" disabled={!postBody.trim()}>
        Post
      </button>
    </form>
  )
}

export default PostForm
