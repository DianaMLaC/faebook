import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import { FaUserFriends } from "react-icons/fa"
import { createPost } from "../../utils/post"

const PostForm = ({ closeModalContainer }) => {
  const { currentUser, profileUser } = useAuth()
  const [postBody, setPostBody] = useState("")
  const [formErr, setFormErr] = useState("")
  const [createPost, setCreatedPost] = useState(null)

  const handleInput = (e) => {
    setPostBody(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = postBody
    const authorId = currentUser.id
    const profileId = profileUser.id
    try {
      const postData = { body, authorId, profileId }
      const postResponse = await createPost(postData)
      console.log("Submit post:", postResponse)
      setCreatedPost(postResponse)
      setPostBody("")
    } catch (err) {
      setFormErr(err.message)
    }
    // After submission I want to close the modal
    setFormErr("")
    closeModalContainer()
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
        <input
          type="text"
          value={postBody}
          onChange={handleInput}
          placeholder="What's on your mind?"
        />
      </div>
      <div className="post-form-add-on-banner">
        <p>Add to your post</p>
        {/* Place for icons and other add-ons */}
      </div>

      {formErr && <p>{formErr}</p>}

      <button type="submit" className="post-submit-active">
        Post
      </button>
    </form>
  )
}

export default PostForm
