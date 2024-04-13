import React from "react"
import { useAuth } from "../context/auth"
import { Outlet } from "react-router-dom"

const NavBar = () => {
  return (
    <div>
      <header className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo">f</div>
          <div className="nav-search">
            <input type="search" placeholder="Find fae folk" />
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-home-button">H</div>
          <div className="nav-friends-button">F</div>
          <div className="nav-groups-button">G</div>
        </div>

        <div className="nav-right">
          <div className="nav-friend-requests-button">fR</div>
          <div className="nav-menu-button">...</div>
          <div className="nav-messenger-button">sms</div>
          <div className="nav-notifications-button">N</div>
          <div className="nav-account-button">Acc</div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}

export default NavBar
