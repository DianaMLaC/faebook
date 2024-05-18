import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import { FaUserFriends } from "react-icons/fa"

const PostForm = ({ closeModal }) => {
  const { currentUser } = useAuth()
  const [postBody, setPostBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    //need to add the api to sent postBody to backend to create post, we also need to send a userId to be used in the url belonging to the profile on which we're posting on
  }
  return (
    <div className="post-form">
      <header className="post-form-header">
        <h3>Create post</h3>
        <div className="close-post-form" onCLick={closeModal()}>
          X
        </div>
      </header>
      <div className="post-form-user-details">
        <div className="avatar"></div>
        <div>
          <div>{currentUser.displayName}</div>
          <div className="visibility">
            <FaUserFriends />
            Friends
          </div>
        </div>
      </div>
      <form>
        <input type="text" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
        <div className="post-form-add-on-banner">
          <div>
            <p>Add to your post</p>
          </div>
          <div>Icons</div>
        </div>
        <button type="submit" onClick={handleSubmit}></button>
      </form>
    </div>
  )
}

export default PostForm
