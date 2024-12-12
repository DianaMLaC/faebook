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
  const [toggleUserMenu, setToggleUserMenu] = useState<boolean>(false)
  const [toggleChatMenu, setToggleChatMenu] = useState<boolean>(false)

  const handleMenuButton = () => {
    setToggleUserMenu(!toggleUserMenu)
    console.log("toggleMenu:", toggleUserMenu)
  }

  return (
    <div className="nav-right">
      {/* <div className="nav-create-button">
        <TbGridDots />
      </div> */}
      <div className="nav-notifications-button">
        <IoMdNotifications />
      </div>
      <div className="nav-messenger-button" onClick={() => !setToggleChatMenu}>
        <div className="chat-menu-toggle">
          <FaFacebookMessenger />
        </div>
        <div className="chat-menu-container">
          <ChatList />
        </div>
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
