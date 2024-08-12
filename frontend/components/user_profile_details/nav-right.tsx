import React, { useState } from "react"
import { TbGridDots } from "react-icons/tb"
import { FaFacebookMessenger } from "react-icons/fa6"
import { IoMdNotifications } from "react-icons/io"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useAuth } from "../../context/auth"
import AccountMenu from "../profile/account-menu"

function NavRight(): React.ReactElement {
  const { currentUser } = useAuth()
  const [toggleUserMenu, setToggleUserMenu] = useState<boolean>(false)

  const handleMenuButton = () => {
    setToggleUserMenu(!toggleUserMenu)
    console.log("toggleMenu:", toggleUserMenu)
  }

  return (
    <div className="nav-right">
      <div className="nav-create-button">
        <TbGridDots />
      </div>
      <div className="nav-messenger-button">
        <FaFacebookMessenger />
      </div>
      <div className="nav-notifications-button">
        <IoMdNotifications />
      </div>
      <div className="nav-account-button" onClick={handleMenuButton}>
        <div className="avatar">
          {currentUser?.profilePhotoUrl ? (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          ) : (
            <img
              className="missing-profile-photo"
              src="/assets/images/missing-profile-pic.png"
              alt="Faebook"
            />
          )}
        </div>
        <div className="account-menu-toggle">
          <MdKeyboardArrowDown />
        </div>
        {toggleUserMenu && (
          <div className="account-menu-container">
            <AccountMenu />
          </div>
        )}
      </div>
    </div>
  )
}

export default NavRight
