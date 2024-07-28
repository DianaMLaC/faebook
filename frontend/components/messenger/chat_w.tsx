import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { IoClose } from "react-icons/io5"
import { FaMinus } from "react-icons/fa6"
import { TbPhotoFilled } from "react-icons/tb"
import { MdEmojiEmotions } from "react-icons/md"
import { BiSolidLike } from "react-icons/bi"
import { RiEmojiStickerFill } from "react-icons/ri"
import { HiMiniGif } from "react-icons/hi2"
import { useWebSocket } from "../../context/websockets"
import MessagesBox from "./messages_box"
import { Message } from "../../utils/types"

function ChatRoomW({ onClose, chat }): React.ReactElement {
  const { profileUser, currentUser } = useAuth()
  const { chats, sendMessageOptimistic } = useWebSocket()
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>(chat.messages || [])

  const handleSendMessage = () => {
    if (chat && message.trim() !== "") {
      if (!currentUser) {
        return
      }
      console.log("sending message from:", currentUser)
      sendMessageOptimistic(chat.id, message, currentUser.id)
      setMessage("")
    }
  }

  const handleChatLike = () => {
    if (currentUser && chat) {
      sendMessageOptimistic(chat.id, "👍", currentUser.id)
    }
  }

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
      <div className="chat-room">
        {chatMessages &&
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={msg.senderId === currentUser?.id ? "message-sent" : "message-received"}
            >
              {msg.body}
            </div>
          ))}
      </div>
      {/* <MessagesBox chatId={chat.id} messages={chatMessages} setMessages={setChatMessages} /> */}

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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage()
            }}
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

export default ChatRoomW
