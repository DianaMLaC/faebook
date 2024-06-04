import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import { FaUserFriends } from "react-icons/fa"
import { createPost } from "../../utils/post_and_comments"
import { CircleLoader } from "react-spinners"
import { usePosts } from "../../context/posts"
import { RxCross2 } from "react-icons/rx"
import { IoMdArrowDropdown } from "react-icons/io"

const PostForm = ({ closeModalContainer }) => {
  const { addPost } = usePosts()
  const { currentUser, profileUser } = useAuth()
  const [postBody, setPostBody] = useState("")
  const [formErr, setFormErr] = useState("")
  // const [createdPost, setCreatedPost] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleInput = (e) => {
    setPostBody(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    let postResponse = null

    try {
      const postResponse = await createPost(postBody, profileUser.id)
      if (postResponse) {
        addPost(postResponse)
        setPostBody("")
        closeModalContainer()
      }
    } catch (err) {
      setFormErr(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <header className="post-form-header">
        <h3>Create post</h3>
        <button className="close-post-form" onClick={closeModalContainer}>
          <RxCross2 />
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
            <IoMdArrowDropdown />
          </div>
        </div>
      </div>
      <div className="post-form-body-input">
        <textarea
          value={postBody}
          onChange={handleInput}
          placeholder="What's on your mind?"
          rows="5"
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
