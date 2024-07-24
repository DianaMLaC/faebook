import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import { IoClose } from "react-icons/io5"
import { FaMinus } from "react-icons/fa6"
import { TbPhotoFilled } from "react-icons/tb"
import { MdEmojiEmotions } from "react-icons/md"
import { BiSolidLike } from "react-icons/bi"
import { RiEmojiStickerFill } from "react-icons/ri"
import { HiMiniGif } from "react-icons/hi2"

function Chat({ onClose }): React.ReactElement {
  const { profileUser } = useAuth()
  const [message, setMessage] = useState("")

  const handleChatLike = () => {}
  const minimizeChat = () => {}

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="chat-header-user">
          <div className="avatar">
            {profileUser?.profilePhotoUrl ? (
              <img className="profile-photo" src={profileUser.profilePhotoUrl} alt="Profile" />
            ) : (
              <img
                className="missing-profile-photo"
                src="/assets/images/missing-profile-pic.png"
                alt="Faebook"
              />
            )}
          </div>
          <div className="chat-header-user-details">
            <div className="post-user-display-name">{profileUser?.displayName}</div>
            <div className="user-active-ago-time">Active 25 m ago</div>
          </div>
        </div>
        <div className="chat-header-buttons">
          <div onClick={minimizeChat}>
            <FaMinus />
          </div>
          <div onClick={onClose}>
            <IoClose />
          </div>
        </div>
      </header>
      <div className="chat-room"></div>
      <div className="chat-footer">
        <div className="chat-footer-icons">
          <TbPhotoFilled />
          <RiEmojiStickerFill />
          <HiMiniGif />
        </div>
        <div className="chat-input-bar">
          <input
            type="text"
            value={message}
            placeholder="Aa"
            onChange={(e) => setMessage(e.target.value)}
          />
          <MdEmojiEmotions className="chat-input-emoji" />
        </div>
        <div className="chat-like" onClick={handleChatLike}>
          <BiSolidLike />
        </div>
      </div>
    </div>
  )
}

export default Chat
