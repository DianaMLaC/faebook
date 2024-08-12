import React from "react"
import { useAuth } from "../../context/auth"
import { PiUserSwitchFill } from "react-icons/pi"
import { IoMdHelpCircle, IoMdSettings } from "react-icons/io"
import { MdNightlight, MdFeedback } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

function AccountMenu(): React.ReactElement {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogOut = () => {
    logout()
    console.log("logging out")
    console.log("currentUser:", currentUser)
  }

  return (
    <div className="account-menu">
      <div className="menu-banner">
        <div
          className="menu-account-profile"
          onClick={() => navigate(`/profile-page/${currentUser?.id}/posts`)}
        >
          <div className="comment-avatar">
            {currentUser?.profilePhotoUrl && (
              <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
            )}
          </div>
          <div className="menu-user-display-name">{currentUser?.displayName}</div>
        </div>
        <div className="menu-see-all-profiles">
          <PiUserSwitchFill />
          <span>See all profiles</span>
        </div>
      </div>

      <div className="menu-item">
        <div className="menu-icon">
          <IoMdSettings />
        </div>
        <div>Settings & Privacy</div>
        {/* <span>
          <IoIosArrowForward />
        </span> */}
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <IoMdHelpCircle />
        </div>
        <div>Help & Support</div>
        {/* <span>
          <IoIosArrowForward />
        </span> */}
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <MdNightlight />
        </div>
        <div>Display & Accessibility</div>
        {/* <span>
          <IoIosArrowForward />
        </span> */}
      </div>
      <div className="menu-item">
        <div className="menu-icon">
          <MdFeedback />
        </div>
        <div>Give feedback</div>
      </div>
      <div className="menu-log-out" onClick={handleLogOut}>
        <div className="menu-icon">
          <IoLogOut />
        </div>
        <div className="">Log out</div>
      </div>
      <div className="menu-footer">
        <span>Privacy · Terms · Advertising · Ad choices · Cookies · Cookies · Meta © 2024</span>
      </div>
    </div>
  )
}

export default AccountMenu
