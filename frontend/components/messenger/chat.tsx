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
import { Chat } from "../../utils/types"

function Chat({ onClose, recipientId }): React.ReactElement {
  const { profileUser, currentUser } = useAuth()
  const { messages, initiateChat, sendMessage } = useWebSocket()
  const [chat, setChat] = useState<Chat | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    console.log("in chat compoenent, before initiating chat")
    if (!recipientId) {
      console.log("It didn't work")
      return
    }

    const setupChat = async () => {
      console.log("it worked, now initiating chat")
      const chatResponse = await initiateChat(recipientId)
      if (chatResponse) {
        console.log("we got the response, now setting up chat")
        setChat(chatResponse)
        console.log("chat set up")
      }
    }

    setupChat()
  }, [recipientId])

  const handleSendMessage = () => {
    if (chat && message.trim() !== "") {
      sendMessage(chat.id, message)
      setMessage("")
    }
  }

  const handleChatLike = () => {
    if (profileUser?.id) {
      sendMessage(profileUser.id, "👍")
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.senderId === currentUser?.id ? "message-sent" : "message-received"
            }`}
          >
            {msg.body}
          </div>
        ))}
      </div>
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

export default Chat
