import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { fetchUserSuggestions } from "../utils/profile"

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const handleSearchChange = async (event) => {
    const value = event.target.value

    setSearchTerm(value)

    if (value.trim()) {
      try {
        const dbData = await fetchUserSuggestions(value)

        console.log("API response:", dbData.users)

        setSuggestions(dbData.users)

        console.log("suggestions:", suggestions)
      } catch (error) {
        console.error("Failed to fetch user suggestions:", error)
      }
    } else {
      setSuggestions([])
    }
  }

  return (
    <div>
      <header className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo">
            <img
              className="nav-logo-img"
              src={require("../../app/assets/images/logo.png").default}
              alt="Faebook"
            ></img>
          </div>
          <div className="nav-search">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Find fae folk"
            />
            <ul className={`suggestions ${suggestions.length > 0 ? "visible" : ""}`}>
              {suggestions.map((user) => (
                <li key={user.id}>
                  <img src={user.profilePhotoUrl} alt={user.displayName} />

                  <span>{user.displayName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="nav-center">
          <div>
            <img
              className="nav-home-button"
              src={require("../../app/assets/images/home.png").default}
              alt="Home"
            ></img>
          </div>
          <div>
            <img
              className="nav-friends-button"
              src={require("../../app/assets/images/friends.png").default}
              alt="Friends"
            ></img>
          </div>
          <div>
            <img
              className="nav-groups-button"
              src={require("../../app/assets/images/groups.png").default}
              alt="Groups"
            ></img>
          </div>
          <div>
            <img
              className="nav-more-button"
              src={require("../../app/assets/images/more.png").default}
              alt="More"
            ></img>
          </div>
        </div>

        <div className="nav-right">
          <div>
            <img
              className="nav-create-button"
              src={require("../../app/assets/images/create.png").default}
              alt="Create"
            ></img>
          </div>
          <div>
            <img
              className="nav-messenger-button"
              src={require("../../app/assets/images/messenger.png").default}
              alt="Messenger"
            ></img>
          </div>
          <div>
            <img
              className="nav-notifications-button"
              src={require("../../app/assets/images/notifications.png").default}
              alt="Notifications"
            ></img>
          </div>
          <div>
            <img
              className="nav-account-button"
              src={require("../../app/assets/images/account.png").default}
              alt="Account"
            ></img>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}

export default NavBar
