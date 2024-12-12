import React, { useState } from "react"
import { TbGridDots } from "react-icons/tb"
import { FaFacebookMessenger } from "react-icons/fa6"
import { IoMdNotifications } from "react-icons/io"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useAuth } from "../../context/auth"
import AccountMenu from "../profile/account-menu"
import { icon } from "../../utils/helpers"
import ChatList from "../messenger/chat_list"

function NavRight(): React.ReactElement {
  const { currentUser } = useAuth()
  const [activeMenu, setActiveMenu] = useState<"user" | "chat" | null>(null) // Track the active menu

  const handleMenuButton = () => {
    setActiveMenu((prev) => (prev === "user" ? null : "user")) // Toggle User Menu
  }

  const handleChatMenuButton = () => {
    setActiveMenu((prev) => (prev === "chat" ? null : "chat")) // Toggle Chat Menu
  }

  return (
    <div className="nav-right">
      {/* <div className="nav-create-button">
        <TbGridDots />
      </div> */}
      <div className="nav-notifications-button">
        <IoMdNotifications />
      </div>
      <div className="nav-messenger-button" onClick={handleChatMenuButton}>
        <div className="chat-menu-toggle">
          <FaFacebookMessenger />
        </div>
        {activeMenu === "chat" && (
          <div className="chat-menu-container">
            <ChatList />
          </div>
        )}
      </div>
      <div className="nav-account-button" onClick={handleMenuButton}>
        <div className="avatar">
          {currentUser?.profilePhotoUrl ? (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          ) : (
            <img className="missing-profile-photo" src={icon.noProfilePhoto} alt="Faebook" />
          )}
        </div>
        <div className="account-menu-toggle">
          <MdKeyboardArrowDown />
        </div>
        {activeMenu === "user" && (
          <div className="account-menu-container">
            <AccountMenu />
          </div>
        )}
      </div>
    </div>
  )
}

export default NavRight
