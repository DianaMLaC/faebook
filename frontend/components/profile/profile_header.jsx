import React, { useCallback, useState, useEffect, useContext } from "react"
import { useAuth } from "../../context/auth"
import PhotoUpload from "./profile_photo_uploader"
import ReactModal from "react-modal"

const ProfileHeader = () => {
  const { currentUser } = useAuth()
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false)
  const [coverModalIsOpen, setCoverModalIsOpen] = useState(false)

  const [profilePhotoFileUrl, setProfilePhotoFileUrl] = useState(null)
  const [coverPhotoFileUrl, setCoverPhotoFileUrl] = useState(null)

  const updatePhoto = useCallback(
    (albumName, url) => {
      switch (albumName) {
        case "Profile": {
          setProfilePhotoFileUrl(url)
          console.log("url has been set for ProfilePhoto")

          break
        }
        case "Cover": {
          setCoverPhotoFileUrl(url)
          console.log("url has been set for CoverPhoto")

          break
        }
      }
    },
    [setCoverPhotoFileUrl, setProfilePhotoFileUrl]
  )

  const openProfileModal = () => {
    setProfileModalIsOpen(true)
    console.log("Modal opened")
  }

  const openCoverModal = () => {
    setCoverModalIsOpen(true)
    console.log("Modal opened")
  }

  const closeProfileModal = () => {
    setProfileModalIsOpen(false)
  }

  const closeCoverModal = () => {
    setCoverModalIsOpen(false)
  }

  useEffect(() => {
    ReactModal.setAppElement(".profile-header")
  }, [])

  return (
    <header className="profile-header">
      <section className="cover-photo-container">
        {coverPhotoFileUrl && <img className="cover-photo" src={coverPhotoFileUrl} alt="Cover" />}
        <button className="cover-photo-button" onClick={openCoverModal}>
          Add cover photo
        </button>
        <ReactModal
          isOpen={coverModalIsOpen}
          onRequestClose={closeCoverModal}
          contentLabel="Cover"
          className="Modal"
        >
          <PhotoUpload
            updatePhoto={updatePhoto}
            closeModalContainer={closeCoverModal}
            albumName={"Cover"}
          />
        </ReactModal>
      </section>

      <section className="profile-photo-container">
        {profilePhotoFileUrl && (
          <img className="profile-photo" src={profilePhotoFileUrl} alt="Profile" />
        )}
      </section>

      <div className="profile-display-name-container">
        <div>
          <button className="profile-photo-button" onClick={openProfileModal}>
            Edit
          </button>
          <h1 className="profile-display-name">{currentUser.displayName}</h1>
        </div>

        <ReactModal
          isOpen={profileModalIsOpen}
          onRequestClose={closeProfileModal}
          contentLabel="Profile"
          className="Modal"
        >
          <PhotoUpload
            updatePhoto={updatePhoto}
            closeModalContainer={closeProfileModal}
            albumName={"Profile"}
          />
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
