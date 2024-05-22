import React, { useState, useEffect } from "react"
import ReactModal from "react-modal"
import PostForm from "./post-form"
import { useAuth } from "../../context/auth"

const CreatePost = () => {
  const { currentUser } = useAuth()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    ReactModal.setAppElement(".posts-page")
  }, [])

  return (
    <div className="create-post">
      <div className="create-post-top">
        <div className="avatar">{currentUser.profilePictureUrl}</div>
        <div className="create-post-input-bar" onClick={openModal}>
          What's on your mind?
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="create-post"
          className="Modal"
        >
          <PostForm closeModalContainer={closeModal} />
        </ReactModal>
      </div>
      <div className="create-post-bottom">
        <div>
          <img
            className="live-video"
            src={require("../../../app/assets/images/live-video.png").default}
            alt="Live-Video"
          />
          <p>Live Video</p>
        </div>
        <div>
          <img
            className="photo-video"
            src={require("../../../app/assets/images/photo-video.png").default}
            alt="Photo-Video"
          />
          <p>Photo/Video</p>
        </div>
        <div>
          <img
            className="life-event"
            src={require("../../../app/assets/images/life-event.png").default}
            alt="Life-Event"
          />
          <p>Life Event</p>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
