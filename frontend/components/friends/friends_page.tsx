import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { useFriends } from "../../context/friends"
import { fetchFriendships } from "../../utils/profile"
import FriendsIndex from "./friends_index"
import FriendRequests from "./friend_requests"

function FriendsPage(): React.ReactElement {
  const { currentUser, profileUser } = useAuth()
  const { acceptedFriends, pendingFriendships, setAcceptedFriends, setPendingFriendships } =
    useFriends()

  const [activeView, setActiveView] = useState("allFriends")
  const [activeLink, setActiveLink] = useState("allFriends")

  useEffect(() => {
    async function getFriendshipsData() {
      try {
        if (profileUser) {
          const friendshipData = await fetchFriendships(profileUser.id)
          // console.log("acceptedFriendsData:", friendshipData.friends.accepted)
          setAcceptedFriends(friendshipData.friends.accepted)
          // console.log("requestedFriendsData:", friendshipData.friends.requests)

          setPendingFriendships(friendshipData.friends.requests)
        }
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    getFriendshipsData()
  }, [profileUser, setAcceptedFriends, setPendingFriendships])

  const handleViewChange = (e, view: string) => {
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