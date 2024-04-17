import React, { useCallback, useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import ProfilePhotoUpload from "./profile_photo_uploader"
import ReactModal from "react-modal"

const ProfileHeader = () => {
  const { currentUser } = useAuth()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [profilePhotoFileUrl, setProfilePhotoFileUrl] = useState(null)

  const updateProfilePhoto = useCallback((url) => {
    setProfilePhotoFileUrl(url)
  }, [])

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    ReactModal.setAppElement(".profile-header") // Or whatever selector that captures your app's root element
  }, [])

  return (
    <header className="profile-header">
      <section className="cover-photo-container">
        <div className="cover-photo"></div>
        <button className="cover-photo-button">Add cover photo</button>
      </section>

      <section className="profile-photo-container">
        <div className="profile-photo">
          {profilePhotoFileUrl && <img src={profilePhotoFileUrl} alt="Profile" />}
        </div>
      </section>

      <div className="profile-display-name-container">
        <div>
          <button className="profile-photo-button" onClick={openModal}>
            Edit
          </button>
          <h1 className="profile-display-name">{currentUser.displayName}</h1>
        </div>

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Profile Photo Upload"
          className="Modal"
        >
          <ProfilePhotoUpload updateProfilePhoto={updateProfilePhoto} />
          <button onClick={closeModal} className="close-modal-button">
            x
          </button>
        </ReactModal>

        <div className="profile-header-nav-buttons">
          <button className="add-to-story-button"> + Add to story</button>
          <button className="edit-profile-button">Edit profile</button>
        </div>
      </div>

      <nav className="profile-header-nav">
        <div className="profile-header-nav-links">
          <a className="posts-link" href="#posts">
            Posts
          </a>
          <a className="about-link" href="#about">
            About
          </a>
          <a className="friends-link" href="#friends">
            Friends
          </a>
          <a className="photos-link" href="#photos">
            Photos
          </a>
          <a className="videos-link" href="#videos">
            Videos
          </a>
          <a className="check-ins-link" href="#checkins">
            Check-ins
          </a>
          <a className="more-link" href="#more">
            More
          </a>
        </div>
        <button className="nav-profile-header-button">...</button>
      </nav>
    </header>
  )
}

export default ProfileHeader
