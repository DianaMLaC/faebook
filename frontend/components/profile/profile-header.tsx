import React, { useCallback, useState, useEffect, MouseEvent } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth"
import PhotoUpload from "./photo-uploader"
import ReactModal from "react-modal"
import { FaPlus, FaCamera } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { RiMessengerLine } from "react-icons/ri"
import { IoPersonAddSharp } from "react-icons/io5"
import { TbDots } from "react-icons/tb"
import { RxCross2 } from "react-icons/rx"
import { deleteFriendship, fetchFriendships, requestFriendship } from "../../utils/profile"
import { User } from "../../utils/types"
import Chat from "../messenger/chat"

function ProfileHeader(): React.ReactElement {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser, profileUser } = useAuth()
  const [profileModalIsOpen, setProfileModalIsOpen] = useState<boolean>(false)
  const [coverModalIsOpen, setCoverModalIsOpen] = useState<boolean>(false)
  const [friendshipRequested, setFriendshipRequested] = useState<boolean>(false)
  const [friendshipAccepted, setFriendshipAccepted] = useState<boolean | null>(false)
  const [existingRelation, setExistingRelation] = useState<boolean>(true)
  const [friendshipId, setFriendshipId] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

  useEffect(() => {
    if (currentUser?.id === profileUser?.id) {
      return
    }

    async function checkFriendshipStatus() {
      try {
        const friendshipData = await fetchFriendships(profileUser!.id)
        console.log({ friendshipData })
        if (friendshipData.existing_relation) {
          setFriendshipAccepted(friendshipData.existing_relation.friendship_accepted)
          setFriendshipRequested(true)

          const acceptedFriendship = friendshipData.friends.accepted.find(
            (friendship): boolean => friendship.user.id === profileUser?.id
          )
          const requestedFriendship = friendshipData.friends.requests.find(
            (friendship): boolean => friendship.user.id === profileUser?.id
          )

          if (acceptedFriendship) {
            setFriendshipId(acceptedFriendship.friendshipId)
          } else if (requestedFriendship) {
            setFriendshipId(requestedFriendship.friendshipId)
          }
        } else {
          setExistingRelation(false)
        }
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    if (profileUser?.id) {
      checkFriendshipStatus()
    }
  }, [profileUser, currentUser?.id])

  const updatePhoto = useCallback(
    (albumName: string, url: string) => {
      if (!currentUser) return

      let newUserData: User = { ...currentUser }
      switch (albumName) {
        case "Profile":
          newUserData.profilePhotoUrl = url
          break
        case "Cover":
          newUserData.coverPhotoUrl = url
          break
        default:
          return
      }

      setCurrentUser(newUserData)
    },
    [currentUser]
  )

  const handleFriendRequest = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!profileUser?.id) return

    try {
      const friendshipRequest = await requestFriendship(profileUser.id)
      if (friendshipRequest) {
        setFriendshipRequested(true)
      }
    } catch (err) {
      console.error("error caught pHeader from api:", err)
    }
  }

  const cancelFriendship = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!friendshipId) return

    try {
      await deleteFriendship(friendshipId)
      setFriendshipRequested(false)
      setFriendshipAccepted(false)
      setFriendshipId(null)
    } catch (err) {
      console.error("error caught pHeader from api:", err)
    }
  }

  let friendshipButton

  switch (true) {
    case friendshipAccepted:
      friendshipButton = (
        <div className="already-friends-button">
          <IoPersonAddSharp />
          <span>Friends</span>
        </div>
      )
      break
    case friendshipRequested:
      friendshipButton = (
        <div className="cancel-friendship-button" onClick={cancelFriendship}>
          <IoPersonAddSharp />
          <span>Cancel request</span>
        </div>
      )
      break
    default:
      friendshipButton = (
        <div className="add-friend-button" onClick={handleFriendRequest}>
          <IoPersonAddSharp />
          <span>Add Friend</span>
        </div>
      )
      break
  }

  const openChat = () => {
    setIsChatOpen(true) // Open the chat
  }

  const closeChat = () => {
    setIsChatOpen(false) // Close the chat
  }

  const openProfileModal = () => setProfileModalIsOpen(true)
  const openCoverModal = () => setCoverModalIsOpen(true)
  const closeProfileModal = () => setProfileModalIsOpen(false)
  const closeCoverModal = () => setCoverModalIsOpen(false)

  useEffect(() => {
    ReactModal.setAppElement(".profile-header")
  }, [])

  return (
    <>
      <header className="profile-header">
        <section className="cover-photo-container">
          {profileUser?.coverPhotoUrl ? (
            <img className="cover-photo" src={profileUser.coverPhotoUrl} alt="Cover" />
          ) : (
            <div className="missing-cover-photo"></div>
          )}
          {currentUser?.id === profileUser?.id && (
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
              albumName="Cover"
            />
          </ReactModal>
        </section>
        <section className="profile-details-banner">
          <div className="profile-photo-background">
            <div className="profile-photo-container">
              {profileUser?.profilePhotoUrl ? (
                <img className="profile-photo" src={profileUser.profilePhotoUrl} alt="Profile" />
              ) : (
                <img
                  className="missing-profile-photo"
                  src="/assets/images/missing-profile-pic.png"
                  alt="Faebook"
                />
              )}
            </div>
            {currentUser?.id === profileUser?.id && (
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
                    albumName="Profile"
                  />
                  <button onClick={closeProfileModal} className="close-photo-modal-button">
                    <RxCross2 />
                  </button>
                </ReactModal>
              </div>
            )}
          </div>
          <div className="profile-display-name-container">
            <h1 className="profile-display-name">{profileUser?.displayName}</h1>
          </div>
          <div className="profile-header-nav-buttons">
            {currentUser?.id === profileUser?.id ? (
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
                <div className="messenger-button" onClick={openChat}>
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
            <NavLink className="profile-header-nav-link" to="posts">
              Posts
            </NavLink>
            <NavLink className="profile-header-nav-link" to="about">
              About
            </NavLink>
            <NavLink className="profile-header-nav-link" to="friends">
              Friends
            </NavLink>
            <NavLink className="profile-header-nav-link" to="photos">
              Photos
            </NavLink>
            <NavLink className="profile-header-nav-link" to="videos">
              Videos
            </NavLink>
            <NavLink className="profile-header-nav-link" to="checkins">
              Check-ins
            </NavLink>
            <NavLink className="profile-header-nav-link" to="music">
              Music
            </NavLink>
            <NavLink className="profile-header-nav-link" to="books">
              Books
            </NavLink>
          </div>
          <div className="nav-profile-header-button">
            <span>
              <TbDots />
            </span>
          </div>
        </nav>
      </header>
      {isChatOpen && <Chat onClose={closeChat} />}
    </>
  )
}

export default ProfileHeader
