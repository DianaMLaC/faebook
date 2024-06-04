import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { fetchUserSuggestions } from "../utils/profile"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import AccountMenu from "./profile/account_menu"

const NavBar = () => {
  const { setProfileUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [toggleUserMenu, setToggleUserMenu] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  const handleSuggestionClick = (userId) => {
    // setProfileUser(null)
    navigate(`/profile-page/${userId}`)
  }

  const handleSearchChange = async (event) => {
    const value = event.target.value
    setSearchTerm(value)

    if (value.trim()) {
      try {
        const dbData = await fetchUserSuggestions(value)
        setSuggestions(dbData.users)
      } catch (error) {
        console.error("Failed to fetch user suggestions:", error)
      }
    } else {
      setSuggestions([])
    }
  }

  const handleMenuButton = () => {
    setToggleUserMenu(!toggleUserMenu)
    console.log("toggleMenu:", toggleUserMenu)
  }

  return (
    <div>
      <header className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo">
            <img className="nav-logo-img" src="/assets/images/logo.png" alt="Faebook"></img>
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
                <li key={user.id} onClick={() => handleSuggestionClick(user.id)}>
                  <img src={user.profilePhotoUrl} alt={user.displayName} />

                  <span>{user.displayName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="nav-center">
          <div>
            <img className="nav-home-button" src="/assets/images/home.png" alt="Home"></img>
          </div>
          <div>
            <img
              className="nav-friends-button"
              src="/assets/images/friends.png"
              alt="Friends"
            ></img>
          </div>
          <div>
            <img className="nav-groups-button" src="/assets/images/groups.png" alt="Groups"></img>
          </div>
          <div>
            <img className="nav-more-button" src="/assets/images/more.png" alt="More"></img>
          </div>
        </div>

        <div className="nav-right">
          <div>
            <img className="nav-create-button" src="/assets/images/create.png" alt="Create"></img>
          </div>
          <div>
            <img
              className="nav-messenger-button"
              src="/assets/images/messenger.png"
              alt="Messenger"
            ></img>
          </div>
          <div>
            <img
              className="nav-notifications-button"
              src="/assets/images/notifications.png"
              alt="Notifications"
            ></img>
          </div>
          <div onClick={handleMenuButton}>
            <img
              className="nav-account-button"
              src="/assets/images/account.png"
              alt="Account"
            ></img>
            {toggleUserMenu && (
              <div className="account-menu-container">
                <AccountMenu />
              </div>
            )}
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}

export default NavBar
