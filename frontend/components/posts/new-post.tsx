import React, { useState, useCallback } from "react"
import { useAuth } from "../../context/auth"
import { RxCross2 } from "react-icons/rx"
import { FaUserFriends } from "react-icons/fa"
import { FaLink } from "react-icons/fa6"
import { TbLibraryPhoto } from "react-icons/tb"
import { IoMdArrowDropdown } from "react-icons/io"
import { BiCheckboxChecked, BiSolidCheckboxChecked } from "react-icons/bi"
import { createPost, postUrl } from "../../utils/post_and_comments"
import { uploadProfilePhoto } from "../../utils/profile"
import { usePosts } from "../../context/posts"
import { Photo, Url } from "../../utils/types"
import PostContainer from "./post"
import { redirect } from "react-router-dom"

function NewPost({ closeModalContainer }): React.ReactElement {
  const { currentUser, profileUser } = useAuth()
  const { addPost } = usePosts()
  const [formErr, setFormErr] = useState("")
  const [postBody, setPostBody] = useState("")
  const [postUrlPreview, setPostUrlPreview] = useState<Url | null>(null)
  const [postPhotoPreview, setPostPhotoPreview] = useState<Photo | null>(null)
  const [postContentType, setPostContentType] = useState("")
  const [postContentId, setPostContentId] = useState("")
  const [toggleInput, setToggleInput] = useState(false)
  const [acceptUrl, setAcceptUrl] = useState(false)
  const [url, setUrl] = useState("")
  const [placeholder, setPlaceholder] = useState("What's on your mind?")

  const handlePhotoClick = () => {
    setToggleInput(true)
    setPostContentType("Photo")
    setPlaceholder("Say something about this photo")
  }

  const handleUrlClick = () => {
    setToggleInput(true)
    setPostContentType("PostUrl")
    setPlaceholder("Say something about this url")
  }

  const closePostInput = () => {
    setToggleInput(false)
    setPlaceholder("What's on your mind?")
  }

  const setUrlInput = async (e) => {
    setFormErr("")
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
        setPostUrlPreview(response)
        setPostContentId(response.id)
        // setFormErr("Url attached to post") // to be replaced by preview
      }
      if (response) {
        setUrl("")
        // setToggleInput(false)
      }
    } catch (err) {
      setAcceptUrl(false)
      setFormErr(err.message)
    }
  }

  const handleFileUpload = async (e) => {
    const photoFile = e.target.files[0]
    const formData = new FormData()
    formData.append("photo[image]", photoFile)
    formData.append("album_name", "Timeline")

    try {
      const fileData = await uploadProfilePhoto(formData)
      console.log({ fileData })
      setPostContentId(fileData.id)
      setFormErr("Photo attached to post") // to be replaced by preview
    } catch (error) {
      console.error("Error uploading photo:", error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (profileUser) {
        const postResponse = postContentId
          ? await createPost(postBody, profileUser.id, postContentId, postContentType)
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
    }
  }

  const isButtonActive = useCallback((): boolean => {
    if (postContentType && postContentId) {
      return postBody.trim() !== ""
    }

    return postBody.trim() !== ""
  }, [postBody, postContentId])

  const renderPostContentInput = (content: string) => {
    switch (content) {
      case "Photo":
        return (
          <div className="post-content-input">
            <input type="file" onChange={handleFileUpload} />
            <div className="close-post-input" onClick={closePostInput}>
              <RxCross2 />
            </div>
          </div>
        )
      case "PostUrl":
        return (
          <div className="post-content-input">
            <div className="post-url-input">
              <input type="url" onChange={setUrlInput} placeholder="Enter URL here" />
              {!acceptUrl ? (
                <div className="post-url-check" onClick={handleUrlUpload}>
                  <BiCheckboxChecked />
                  {/* <span>Check Url</span> */}
                </div>
              ) : (
                <div className="post-url-accepted">
                  <BiSolidCheckboxChecked />
                </div>
              )}
            </div>
            <div className="close-post-input" onClick={closePostInput}>
              <RxCross2 />
            </div>
          </div>
        )
      default:
        return <p></p>
    }
  }

  const renderPostAddContentBanner = () => {
    return (
      <div className="post-form-add-on-banner">
        {!toggleInput ? (
          <div className="choose-input">
            <p>Add to your post</p>
            <span>
              <span className="post-url-button" onClick={handleUrlClick}>
                <FaLink />
              </span>
              <span className="post-photo-button" onClick={handlePhotoClick}>
                <TbLibraryPhoto />
              </span>
            </span>
          </div>
        ) : (
          renderPostContentInput(postContentType)
        )}
      </div>
    )
  }

  const renderPreview = () => {
    switch (postContentType) {
      case "PostUrl":
        if (!postUrlPreview) {
          return
        }
        return (
          <div className="post-content-preview">
            <img src={postUrlPreview.image} alt={postUrlPreview.title} />
            <div className="post-url-preview-details">
              <div className="post-url-title">{postUrlPreview.title}</div>
              <div className="post-url-description">{postUrlPreview.description}</div>
            </div>
          </div>
        )
      case "Photo":
        if (!postPhotoPreview) {
          return
        }
        return (
          <div className="post-content-preview">
            <img
              className="photo-cover-image"
              src={postPhotoPreview.url}
              alt={postPhotoPreview.description}
            />
          </div>
        )
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

      <div className="post-form-body">
        <div className="post-form-body-input">
          <textarea
            value={postBody}
            onChange={(e) => {
              setPostBody(e.target.value)
            }}
            placeholder={placeholder}
          />
        </div>

        {postContentId ? renderPreview() : renderPostAddContentBanner()}
      </div>
      {formErr && <div className="form-errors">{formErr}</div>}

      <button type="submit" className="post-submit-button" disabled={!isButtonActive()}>
        Post
      </button>
    </form>
  )
}

export default NewPost
