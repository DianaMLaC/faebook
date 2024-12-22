import React, { useCallback, useState, useEffect, MouseEvent } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth"
import PhotoUpload from "./photo-uploader"
import ReactModal from "react-modal"
import { FaPlus, FaCamera } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { RiMessengerLine } from "react-icons/ri"
import { IoPersonAddSharp } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { deleteFriendship, fetchFriendships, requestFriendship } from "../../utils/axios"
import { Chat, User } from "../../utils/types"
import ChatRoom from "../messenger/chat_room"
import { initiateChat } from "../../utils/axios"
import { icon } from "../../utils/helpers"
import { useChat } from "../../context/chat"

function ProfileHeader(): React.ReactElement {
  const { currentUser, setCurrentUser, profileUser } = useAuth()
  const { openChat, currentChat, isChatOpen } = useChat()

  const [receiver, setReceiver] = useState<User | null>(null)
  const [profileModalIsOpen, setProfileModalIsOpen] = useState<boolean>(false)
  const [coverModalIsOpen, setCoverModalIsOpen] = useState<boolean>(false)

  const [friendshipRequested, setFriendshipRequested] = useState<boolean>(false)
  const [friendshipAccepted, setFriendshipAccepted] = useState<boolean | null>(false)
  const [friendshipId, setFriendshipId] = useState<string | null>(null)

  useEffect(() => {
    // we don't check for friendship on when current user is on his own profile
    if (currentUser?.id === profileUser?.id) {
      return
    }

    async function checkFriendshipStatus() {
      try {
        const friendshipData = await fetchFriendships(profileUser!.id)
        console.log({ friendshipData })

        // when there is no friendship record of the current user and profile user
        if (friendshipData.existing_relation === null) {
          console.log("there is no existing relation between")
          return
        }

        setFriendshipId(friendshipData.existing_relation.id)
        console.log("there is an existing relation")

        if (friendshipData.existing_relation.is_accepted) {
          setFriendshipAccepted(friendshipData.existing_relation.is_accepted)
          console.log("there is an existing relation and friendship is accepted")
        } else {
          setFriendshipRequested(true)
          console.log("there is an existing relation and friendship is pending")
        }
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    if (currentUser && profileUser?.id) {
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
      console.log("friendship requested")
      if (friendshipRequest) {
        setFriendshipRequested(true)
        console.log(" friendshipRequested state set to true")
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

  const handleOpenChat = async () => {
    console.log("Opening messenger chat")
    if (!currentUser || !profileUser) {
      return
    }
    setReceiver(profileUser)
    openChat(currentUser.id, profileUser.id)
  }

  const openProfileModal = useCallback(() => setProfileModalIsOpen(true), [])
  const openCoverModal = useCallback(() => setCoverModalIsOpen(true), [])
  const closeProfileModal = useCallback(() => setProfileModalIsOpen(false), [])
  const closeCoverModal = useCallback(() => setCoverModalIsOpen(false), [])

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
            <button onClick={closeCoverModal} className="close-photo-modal-button">
              <RxCross2 />
            </button>
          </ReactModal>
        </section>
        <section className="profile-details-banner">
          <div className="profile-photo-background">
            <div className="profile-photo-container">
              {profileUser?.profilePhotoUrl ? (
                <img className="profile-photo" src={profileUser.profilePhotoUrl} alt="Profile" />
              ) : (
                <img className="missing-profile-photo" src={icon.noProfilePhoto} alt="Faebook" />
              )}
            </div>
            {currentUser?.id === profileUser?.id && (
              <div className="profile-photo-button-container" onClick={openProfileModal}>
                <FaCamera />
              </div>
            )}
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
                <div
                  className="messenger-button"
                  onClick={() => openChat(currentUser!.id, profileUser!.id)}
                >
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
        </nav>
      </header>
      {isChatOpen && <ChatRoom chat={currentChat} receiver={receiver} />}
    </>
  )
}

export default ProfileHeader
