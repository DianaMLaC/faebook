import React from "react"
import { Outlet } from "react-router-dom"

const NavBar = () => {
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
            <input type="search" placeholder="Find fae folk" />
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
