import React from "react"
import { useAuth } from "../context/auth"
import { Outlet } from "react-router-dom"

const NavBar = () => {
  return (
    <div>
      <header className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo"></div>
          <div className="nav-search"></div>
        </div>

        <div className="nav-center">
          <div className="nav-home-button"></div>
          <div className="nav-friends-button"></div>
          <div className="nav-groups-button"></div>
        </div>

        <div className="nav-right">
          <div className="nav-friend-requests-button"></div>
          <div className="nav-menu-button"></div>
          <div className="nav-messenger-button"></div>
          <div className="nav-notifications-button"></div>
          <div className="nav-account-button"></div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}

export default NavBar
