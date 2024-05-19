import React, { useState, useEffect } from "react"
import ReactModal from "react-modal"
import PostForm from "./post-form"

const CreatePost = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    ReactModal.setAppElement(".profile-page")
  }, [])

  return (
    <div className="create-post">
      <div className="create-post-top">
        <div className="avatar"></div>
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
          <button onClick={closeModal} className="close-modal-button">
            x
          </button>
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
