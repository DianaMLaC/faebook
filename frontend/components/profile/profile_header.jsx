import React, { useCallback, useState, useEffect, useContext } from "react"
import { useAuth } from "../../context/auth"
import PhotoUpload from "./profile_photo_uploader"
import ReactModal from "react-modal"

const ProfileHeader = () => {
  const { currentUser, setCurrentUser } = useAuth()
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false)
  const [coverModalIsOpen, setCoverModalIsOpen] = useState(false)

  const updatePhoto = useCallback(
    (albumName, url) => {
      let newUserData = {}
      switch (albumName) {
        case "Profile": {
          newUserData = { ...currentUser, profilePhotoUrl: url }

          console.log("currentUser:", currentUser)
          console.log("url has been set for ProfilePhoto")
          break
        }
        case "Cover": {
          newUserData = { ...currentUser, coverPhotoUrl: url }

          console.log("currentUser:", currentUser)
          console.log("url has been set for CoverPhoto")
          break
        }
        default:
          return
      }

      setCurrentUser(newUserData)
      sessionStorage.setItem("currentUser", JSON.stringify(newUserData))
    },
    [currentUser, setCurrentUser]
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
        {currentUser.coverPhotoUrl && (
          <img className="cover-photo" src={currentUser.coverPhotoUrl} alt="Cover" />
        )}
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
      <section className="profile-photo-background"></section>
      <section className="profile-photo-container">
        {currentUser.profilePhotoUrl && (
          <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
        )}
      </section>

      <div className="profile-display-name-container">
        <div>
          <button className="profile-photo-button" onClick={openProfileModal}>
            <img
              className="nav-button-icon"
              src={require("../../../app/assets/images/camera.png").default}
              alt="Edit profile picture"
            />
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
