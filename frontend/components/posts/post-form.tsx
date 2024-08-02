import React, { useCallback, useState, useEffect } from "react"
import { createPost, postUrl } from "../../utils/post_and_comments"
import { uploadProfilePhoto } from "../../utils/profile"
import { BiCheckboxChecked, BiSolidCheckboxChecked } from "react-icons/bi"
import { useAuth } from "../../context/auth"
import { usePosts } from "../../context/posts"
import { FaUserFriends } from "react-icons/fa"
import { FaLink } from "react-icons/fa6"
import { CircleLoader } from "react-spinners"
import { RxCross2 } from "react-icons/rx"
import { IoMdArrowDropdown } from "react-icons/io"
import { TbLibraryPhoto } from "react-icons/tb"

function PostForm({ closeModalContainer }): React.ReactElement {
  const { addPost } = usePosts()
  const { currentUser, profileUser } = useAuth()
  const [postBody, setPostBody] = useState("")
  const [formErr, setFormErr] = useState("")
  const [contentType, setContentType] = useState("")
  const [contentId, setContentId] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [togglePhotoInput, setTogglePhotoInput] = useState(false)
  const [toggleUrlInputBar, setToggleUrlInputBar] = useState(false)
  const [acceptUrl, setAcceptUrl] = useState(false)
  const [url, setUrl] = useState("")

  const isButtonActive = useCallback(() => {
    if (togglePhotoInput) {
      return contentId !== ""
    } else if (acceptUrl) {
      return contentId !== ""
    }
    return postBody.trim() !== ""
  }, [postBody, contentType, contentId])

  const handleTextInput = (e) => {
    setPostBody(e.target.value)
  }

  const handlePhotoInput = (e) => {
    setTogglePhotoInput(true)
  }

  const handleUrlInput = (e) => {
    setToggleUrlInputBar(true)
  }

  const setUrlInput = async (e) => {
    setFormErr("")
    setContentType("PostUrl")
    setUrl(e.target.value.trim())
  }

  const handleUrlUpload = async (e) => {
    setAcceptUrl(true)
    if (url === "") {
      setAcceptUrl(false)
      setFormErr("Url can't be blank")
      return
    }

    try {
      const response = await postUrl(url)
      if (response) {
        setContentId(response.id)
      }
      if (response) {
        setUrl("")
        setToggleUrlInputBar(false)
      }
    } catch (err) {
      setFormErr(err.message)
    }
  }

  const handleFileUpload = async (e) => {
    setContentType("Photo")
    const photoFile = e.target.files[0]
    const formData = new FormData()
    formData.append("photo[image]", photoFile)
    formData.append("album_name", "Timeline")

    try {
      const fileData = await uploadProfilePhoto(formData)
      console.log({ fileData })
      setContentId(fileData.id)
    } catch (error) {
      console.error("Error uploading photo:", error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    try {
      if (profileUser) {
        const postResponse = contentId
          ? await createPost(postBody, profileUser.id, contentId, contentType)
          : await createPost(postBody, profileUser.id)
        if (postResponse) {
          console.log({ postResponse })
          addPost(postResponse)
          closeModalContainer()
        }
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
          {currentUser?.profilePhotoUrl ? (
            <img className="profile-photo" src={currentUser?.profilePhotoUrl} alt="Profile" />
          ) : (
            <img
              className="missing-profile-photo"
              src="/assets/images/missing-profile-pic.png"
              alt="Faebook"
            />
          )}
        </div>
        <div>
          <div className="post-user-display-name">{currentUser?.displayName}</div>
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
          onChange={handleTextInput}
          placeholder="What's on your mind?"
          rows={5}
        />
        {/* {photoFile && <div className="photo-preview">{photoFile}</div>} */}
      </div>
      <div className="post-form-add-on-banner">
        <p>Add to your post</p>
        {toggleUrlInputBar && (
          <span>
            <input type="text" onChange={setUrlInput} />
            {!acceptUrl ? (
              <span onClick={handleUrlUpload}>
                <BiCheckboxChecked />
              </span>
            ) : (
              <span>
                <BiSolidCheckboxChecked />
              </span>
            )}
          </span>
        )}

        {togglePhotoInput && (
          <span>
            <input type="file" onChange={handleFileUpload} />
          </span>
        )}
        <span onClick={handleUrlInput}>
          <FaLink />
        </span>
        <span onClick={handlePhotoInput}>
          <TbLibraryPhoto />
        </span>
      </div>

      {formErr ? (
        <div className="form-errors">{formErr}</div>
      ) : (
        <div className="spinner">{isUploading && <CircleLoader loading={isUploading} />}</div>
      )}

      <button type="submit" className="post-submit-button" disabled={!isButtonActive()}>
        Post
      </button>
    </form>
  )
}

export default PostForm
