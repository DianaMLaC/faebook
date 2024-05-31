import React from "react"
import { useAuth } from "../../context/auth"
import { PiUserSwitchFill } from "react-icons/pi"
import { IoIosArrowForward } from "react-icons/io"

const AccountMenu = () => {
  const { currentUser, logout } = useAuth()

  const handleLogOut = () => {
    logout()
    console.log("logging out")
    console.log("currentUser:", currentUser)
  }

  return (
    <div className="account-menu">
      <div className="menu-banner">
        <div className="menu-account-profile">
          <div className="comment-avatar">
            {currentUser.profilePhotoUrl && (
              <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
            )}
          </div>
          <div className="menu-user-display-name">{currentUser.displayName}</div>
        </div>
        <div className="menu-see-all-profiles">
          <PiUserSwitchFill />
          <span>See all profiles</span>
        </div>
      </div>

      <div className="menu-item">
        <div className="menu-icon">
          <img
            className="settings"
            src={require("../../../app/assets/images/settings.png").default}
            alt="Settings"
          ></img>
        </div>
        <span>Settings & Privacy</span>
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <img
            className="help"
            src={require("../../../app/assets/images/help.png").default}
            alt="Help"
          ></img>
        </div>
        <span>Help & Support</span>
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <img
            className="display"
            src={require("../../../app/assets/images/display.png").default}
            alt="Display"
          ></img>
        </div>
        <span>Display & Accessibility</span>
        <span>
          <IoIosArrowForward />
        </span>
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <img
            className="feedback"
            src={require("../../../app/assets/images/feedback.png").default}
            alt="Feedback"
          ></img>
        </div>
        <span>Give feedback</span>
      </div>
      <div className="menu-log-out" onClick={handleLogOut}>
        <div className="menu-icon">
          <img
            className="logout"
            src={require("../../../app/assets/images/logout.png").default}
            alt="Log Out"
          ></img>
        </div>
        <span className="">Log out</span>
      </div>
      <div className="menu-footer">
        <span>Privacy · Terms · Advertising · Ad choices · Cookies · Cookies · Meta © 2024</span>
      </div>
    </div>
  )
}

export default AccountMenu
