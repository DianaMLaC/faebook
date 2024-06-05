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
import { deleteFriendship, fetchFriendships, requestFriendship } from "../../utils/profile"

const ProfileHeader = () => {
  const { currentUser, setCurrentUser, profileUser } = useAuth()
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false)
  const [coverModalIsOpen, setCoverModalIsOpen] = useState(false)
  const [friendshipRequested, setFriendshipRequested] = useState(false)
  const [friendshipAccepted, setFriendshipAccepted] = useState(false)
  const [existingRelation, setExistingRelation] = useState(true)

  useEffect(() => {
    if (currentUser.id === profileUser.id) {
      console.log("User is viewing their own profile, no need to check for friendship.")
      return
    }

    async function checkFriendshipStatus() {
      try {
        console.log("fetching data from backend")
        const friendshipData = await fetchFriendships(profileUser.id)
        if (friendshipData.existing_relation) {
          setFriendshipAccepted(friendshipData.existing_relation.friendship_accepted)
          setFriendshipRequested(true)
        } else {
          setExistingRelation(false)
        }
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    if (profileUser.id) {
      checkFriendshipStatus()
    }
  }, [profileUser])

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
  const handleFriendRequest = async (e) => {
    e.preventDefault()
    try {
      const friendshipRequest = await requestFriendship(profileUser.id)
      if (friendshipRequest) {
        setFriendshipRequested(true)
        console.log("friend-request:", friendshipRequest)
      }
    } catch (err) {
      console.error("error caught pHeader from api:", err)
    }
  }

  const cancelFriendship = async (e) => {
    e.preventDefault()
    try {
      const friendshipResp = await deleteFriendship(friendship.id)
      if (friendshipResp) {
        setFriendshipRequested(false)
        setFriendshipAccepted(false)
      }
    } catch (err) {
      console.error("error caught pHeader from api:", err)
    }
  }

  let friendshipButton

  switch (true) {
    case friendshipAccepted:
      friendshipButton = (
        <>
          <div className="already-friends-button">
            <IoPersonAddSharp />
            <span>Friends</span>
          </div>
        </>
      )
      break
    case friendshipRequested:
      friendshipButton = (
        <>
          <div className="cancel-friendship-button" onClick={cancelFriendship}>
            <IoPersonAddSharp />
            <span>Cancel request</span>
          </div>
        </>
      )
      break
    default:
      friendshipButton = (
        <>
          <div className="add-friend-button" onClick={handleFriendRequest}>
            <IoPersonAddSharp />
            <span>Add Friend</span>
          </div>
        </>
      )
      break
  }

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
          {currentUser.id === profileUser.id && (
            <div className="profile-photo-button-container" onClick={openProfileModal}>
              <FaCamera />
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
          )}
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
              {friendshipButton}
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
