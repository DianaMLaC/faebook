import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { fetchUserSuggestions } from "../utils/profile"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import AccountMenu from "./profile/account_menu"
import { BiHomeAlt } from "react-icons/bi"
import { MdOutlineOndemandVideo } from "react-icons/md"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { CgGames } from "react-icons/cg"
import { TbGridDots } from "react-icons/tb"
import { FaFacebookMessenger } from "react-icons/fa6"
import { IoNotificationsCircle, IoSearchOutline } from "react-icons/io5"

const NavBar = () => {
  const { currentUser, setProfileUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [toggleUserMenu, setToggleUserMenu] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  const handleSuggestionClick = (userId) => {
    setProfileUser(null)
    setSuggestions([])
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
            {suggestions && (
              <ul className={`suggestions ${suggestions.length > 0 ? "visible" : ""}`}>
                {suggestions.map((user) => (
                  <li key={user.id} onClick={() => handleSuggestionClick(user.id)}>
                    <img src={user.profilePhotoUrl} alt={user.displayName} />

                    <span>{user.displayName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-home-button">
            <BiHomeAlt />
          </div>
          <div className="nav-video-button">
            <MdOutlineOndemandVideo />
          </div>
          <div className="nav-groups-button">
            <HiOutlineUserGroup />
          </div>
          <div className="nav-games-button">
            <CgGames />
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-create-button">
            <TbGridDots />
          </div>
          <div className="nav-messenger-button">
            <FaFacebookMessenger />
          </div>
          <div className="nav-notifications-button">
            <IoNotificationsCircle />
          </div>
          <div className="nav-account-button" onClick={handleMenuButton}>
            <div className="avatar">
              {currentUser.profilePhotoUrl && (
                <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
              )}
            </div>
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
