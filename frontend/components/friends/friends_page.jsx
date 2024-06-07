import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchFriendships } from "../../utils/profile"
import FriendsIndex from "./friends_index"
import FriendRequests from "./friend_requests"

const FriendsPage = () => {
  const { currentUser, profileUser } = useAuth()

  const [activeView, setActiveView] = useState("allFriends")
  const [activeLink, setActiveLink] = useState("allFriends")
  const [acceptedFriends, setAcceptedFriends] = useState(null)
  const [pendingFriendships, setPendingFriendships] = useState([])

  useEffect(() => {
    async function getFriendshipsData() {
      try {
        const friendshipData = await fetchFriendships(profileUser.id)
        setAcceptedFriends(friendshipData.friends.accepted)
        setPendingFriendships(friendshipData.friends.requests)
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    if (profileUser.id) {
      getFriendshipsData()
    }
  }, [profileUser])

  const handleViewChange = (e, view) => {
    e.preventDefault()
    setActiveView(view)
    setActiveLink(view)
  }

  const getViewComponent = () => {
    switch (activeView) {
      case "allFriends":
        return <FriendsIndex friends={acceptedFriends} />
      case "friendRequests":
        return <FriendRequests requests={pendingFriendships} />
      default:
        return null
    }
  }

  return (
    <div className="friends-page-container">
      <header>
        <h2> Friends </h2>
        <div className="friends-page-header-right">
          <div className="friends-page-search-bar">
            <span>Search</span>
          </div>
          <div className="friends-page-more-button">...</div>
        </div>
      </header>
      <nav className="friends-nav">
        <span
          className={activeLink === "allFriends" ? "active" : ""}
          onClick={(e) => handleViewChange(e, "allFriends")}
        >
          All Friends
        </span>
        <span
          className={activeLink === "friendRequests" ? "active" : ""}
          onClick={(e) => handleViewChange(e, "friendRequests")}
        >
          Friend Requests
        </span>
        {/* <div>Birthdays</div>
        <div>House Friends</div> */}
      </nav>
      <div className="friends-displayed">{getViewComponent()}</div>
    </div>
  )
}

export default FriendsPage
