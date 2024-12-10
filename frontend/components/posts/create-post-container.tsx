import React, { useState, useEffect } from "react"
import ReactModal from "react-modal"
import { useAuth } from "../../context/auth"
import NewPost from "./new-post"
import { icon } from "../../utils/helpers"

function CreatePost(): React.ReactElement {
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
        <div className="avatar">
          {currentUser?.profilePhotoUrl ? (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          ) : (
            <img className="missing-profile-photo" src={icon.noProfilePhoto} alt="Faebook" />
          )}
        </div>
        <div className="create-post-input-bar" onClick={openModal}>
          What's on your mind?
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="create-post"
          className="Modal"
        >
          <NewPost closeModalContainer={closeModal} />
        </ReactModal>
      </div>
      <div className="create-post-bottom" onClick={openModal}>
        <div>
          <img className="live-video" src={icon.video} alt="Live-Video" />
          <p>Live Video</p>
        </div>
        <div>
          <img className="photo-video" src={icon.photo} alt="Photo-Video" />
          <p>Photo/Video</p>
        </div>
        <div>
          <img className="life-event" src={icon.event} alt="Life-Event" />
          <p>Life Event</p>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
