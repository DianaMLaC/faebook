import React, { useState } from "react"
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
    ReactModal.setAppElement(".profile-page") // Or whatever selector that captures your app's root element
  }, [])

  return (
    <div>
      <div className="create-post-top">
        <div className="create-post-avatar"></div>
        <div className="create-post-input-bar">
          <input type="text" placeholder="What's on your mind?" onClick={openModal} />
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
      </div>
    </div>
  )
}

export default CreatePost
