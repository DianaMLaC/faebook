import React, { useCallback, useState, useEffect, MouseEvent } from "react"
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
import PostsPage from "../posts/posts_page"
import FriendsPage from "../friends/friends_page"
import PhotosPage from "../photos/photos-page"
import AboutMe from "../user_profile_details/about-me"
import Videos from "./videos"
import CheckIns from "./check-ins"
import Books from "./books"
import Music from "./music"
import { FriendshipData, User } from "../../utils/types"
import PostsProvider from "../../context/posts"
import FriendsProvider from "../../context/friends"

function ProfileHeader(): React.ReactElement {
  const { currentUser, setCurrentUser, profileUser } = useAuth()
  const [profileModalIsOpen, setProfileModalIsOpen] = useState<boolean>(false)
  const [coverModalIsOpen, setCoverModalIsOpen] = useState<boolean>(false)
  const [friendshipRequested, setFriendshipRequested] = useState<boolean>(false)
  const [friendshipAccepted, setFriendshipAccepted] = useState<boolean | null>(false)
  const [existingRelation, setExistingRelation] = useState<boolean>(true)
  const [activeView, setActiveView] = useState<string>("posts")
  const [activeLink, setActiveLink] = useState<string>("posts")
  const [friendshipId, setFriendshipId] = useState<number | null>(null)

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
      sessionStorage.setItem("currentUser", JSON.stringify(newUserData))
    },
    [currentUser, setCurrentUser]
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

  const openProfileModal = () => setProfileModalIsOpen(true)
  const openCoverModal = () => setCoverModalIsOpen(true)
  const closeProfileModal = () => setProfileModalIsOpen(false)
  const closeCoverModal = () => setCoverModalIsOpen(false)

  useEffect(() => {
    ReactModal.setAppElement(".profile-header")
  }, [])

  const handleViewChange = (e: MouseEvent<HTMLDivElement>, view: string) => {
    e.preventDefault()
    setActiveView(view)
    setActiveLink(view)
  }

  const getViewComponent = () => {
    switch (activeView) {
      case "posts":
        return (
          <PostsProvider>
            <PostsPage />
          </PostsProvider>
        )
      case "about":
        return <AboutMe />
      case "friends":
        return (
          <FriendsProvider>
            <FriendsPage />
          </FriendsProvider>
        )
      case "photos":
        return <PhotosPage />
      case "videos":
        return <Videos />
      case "checkins":
        return <CheckIns />
      case "music":
        return <Music />
      case "books":
        return <Books />
      default:
        return null
    }
  }

  return (
    <>
      <header className="profile-header">
        <section className="cover-photo-container">
          {profileUser?.coverPhotoUrl && (
            <img className="cover-photo" src={profileUser.coverPhotoUrl} alt="Cover" />
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
              {profileUser?.profilePhotoUrl && (
                <img className="profile-photo" src={profileUser.profilePhotoUrl} alt="Profile" />
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
            <div
              className={activeLink === "posts" ? "selected" : ""}
              onClick={(e) => handleViewChange(e, "posts")}
            >
              Posts
            </div>
            <div
              className={`profile-header-nav-link ${activeLink === "about" ? "selected" : ""}`}
              onClick={(e) => handleViewChange(e, "about")}
            >
              About
            </div>
            <div
              className={`profile-header-nav-link ${activeLink === "friends" ? "selected" : ""}`}
              onClick={(e) => handleViewChange(e, "friends")}
            >
              Friends
            </div>
            <div
              className={`profile-header-nav-link ${activeLink === "photos" ? "selected" : ""}`}
              onClick={(e) => handleViewChange(e, "photos")}
            >
              Photos
            </div>
            <div
              className={`profile-header-nav-link ${activeLink === "videos" ? "selected" : ""}`}
              onClick={(e) => handleViewChange(e, "videos")}
            >
              Videos
            </div>
            <div
              className={`profile-header-nav-link ${activeLink === "checkins" ? "selected" : ""}`}
              onClick={(e) => handleViewChange(e, "checkins")}
            >
              Check-ins
            </div>
            <div
              className={`profile-header-nav-link ${activeLink === "music" ? "selected" : ""}`}
              onClick={(e) => handleViewChange(e, "music")}
            >
              Music
            </div>
            <div
              className={`profile-header-nav-link ${activeLink === "books" ? "selected" : ""}`}
              onClick={(e) => handleViewChange(e, "books")}
            >
              Books
            </div>
          </div>
          <div className="nav-profile-header-button">
            <span>
              <TbDots />
            </span>
          </div>
        </nav>
      </header>
      <section className="profile-page-components">{getViewComponent()}</section>
    </>
  )
}

export default ProfileHeader
