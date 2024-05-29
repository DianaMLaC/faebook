import React from "react"
import { useAuth } from "../../context/auth"
import { PiUserSwitchFill } from "react-icons/pi"
import { IoIosArrowForward } from "react-icons/io"

const AccountMenu = () => {
  const { currentUser } = useAuth()

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
        <div className="menu-icon"></div>
        <span>Help & Support</span>
      </div>
      <div className="menu-item">
        <div className="menu-icon"></div>
        <span>Display & Accessibility</span>
        <span>
          <IoIosArrowForward />
        </span>
      </div>
      <div className="menu-item">
        <div className="menu-icon"></div>
        <span>Give feedback</span>
      </div>
      <div className="menu-item">
        <div className="menu-icon"></div>
        <span>Log out</span>
      </div>
      <div className="menu-footer">
        <span>Privacy · Terms · Advertising · Ad choices · Cookies · Cookies · Meta © 2024</span>
      </div>
    </div>
  )
}

export default AccountMenu
