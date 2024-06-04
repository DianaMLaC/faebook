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
          <img className="settings" src="/assets/images/settings.png" alt="Settings"></img>
        </div>
        <span>Settings & Privacy</span>
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <img className="help" src="/assets/images/help.png" alt="Help"></img>
        </div>
        <span>Help & Support</span>
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <img className="display" src="/assets/images/display.png" alt="Display"></img>
        </div>
        <span>Display & Accessibility</span>
        <span>
          <IoIosArrowForward />
        </span>
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <img className="feedback" src="/assets/images/feedback.png" alt="Feedback"></img>
        </div>
        <span>Give feedback</span>
      </div>
      <div className="menu-log-out" onClick={handleLogOut}>
        <div className="menu-icon">
          <img className="logout" src="/assets/images/logout.png" alt="Log Out"></img>
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
