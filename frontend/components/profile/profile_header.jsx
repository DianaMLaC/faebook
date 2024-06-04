import React, { useCallback, useState, useEffect, useContext } from "react"
import { useAuth } from "../../context/auth"
import PhotoUpload from "./photo_uploader"
import ReactModal from "react-modal"
import { FaPlus } from "react-icons/fa6"
import { MdModeEditOutline } from "react-icons/md"
import { RiMessengerLine } from "react-icons/ri"
import { IoPersonAddSharp } from "react-icons/io5"
import { FaCamera } from "react-icons/fa"
import { TbDots } from "react-icons/tb"

const ProfileHeader = () => {
  const { currentUser, setCurrentUser, profileUser } = useAuth()
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false)
  const [coverModalIsOpen, setCoverModalIsOpen] = useState(false)

  const updatePhoto = useCallback(
    (albumName, url) => {
      let newUserData = {}
      switch (albumName) {
        case "Profile": {
          newUserData = { ...currentUser, profilePhotoUrl: url }

          // console.log("currentUser:", currentUser)
          // console.log("url has been set for ProfilePhoto")
          break
        }
        case "Cover": {
          newUserData = { ...currentUser, coverPhotoUrl: url }

          // console.log("currentUser:", currentUser)
          // console.log("url has been set for CoverPhoto")
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
    // console.log("Modal opened")
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
        {profileUser.coverPhotoUrl && (
          <img className="cover-photo" src={profileUser.coverPhotoUrl} alt="Cover" />
        )}
        {currentUser.id === profileUser.id && (
          <div className="cover-photo-button" onClick={openCoverModal}>
            <FaCamera />
            <span>Edit cover photo</span>
          </div>
        )}
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
      <section className="profile-details-banner">
        <div className="profile-photo-background">
          <div className="profile-photo-container">
            {profileUser.profilePhotoUrl && (
              <img className="profile-photo" src={profileUser.profilePhotoUrl} alt="Profile" />
            )}
          </div>
          <div className="profile-photo-button-container" onClick={openProfileModal}>
            {currentUser.id === profileUser.id && <FaCamera />}
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
          </div>
        </div>
        <div className="profile-display-name-container">
          <h1 className="profile-display-name">{profileUser.displayName}</h1>
        </div>
        <div className="profile-header-nav-buttons">
          {currentUser.id === profileUser.id ? (
            <>
              <div className="add-to-story-button">
                <FaPlus />
                <span>Add to story</span>
              </div>
              <div className="edit-profile-button">
                <MdModeEditOutline />
                <span>Edit profile</span>
              </div>
            </>
          ) : (
            <>
              <div className="messenger-button">
                <RiMessengerLine />
                <span>Messenger</span>
              </div>
              <div className="add-friend-button">
                <IoPersonAddSharp />
                <span>Add Friend</span>
              </div>
            </>
          )}
        </div>
      </section>

      <nav className="profile-header-nav">
        <div className="profile-header-nav-links">
          <a className="selected" href="#posts">
            Posts
          </a>
          <a className="" href="#about">
            About
          </a>
          <a className="" href="#friends">
            Friends
          </a>
          <a className="" href="#photos">
            Photos
          </a>
          <a className="" href="#videos">
            Videos
          </a>
          <a className="" href="#checkins">
            Check-ins
          </a>
        </div>
        <div className="nav-profile-header-button">
          <span>
            <TbDots />
          </span>
        </div>
      </nav>
    </header>
  )
}

export default ProfileHeader
