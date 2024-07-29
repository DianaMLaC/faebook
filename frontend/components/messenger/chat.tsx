import React, { useState, useEffect, Consumer } from "react"
import { useAuth } from "../../context/auth"
import { IoClose } from "react-icons/io5"
import { FaMinus } from "react-icons/fa6"
import { TbPhotoFilled } from "react-icons/tb"
import { MdEmojiEmotions } from "react-icons/md"
import { BiSolidLike } from "react-icons/bi"
import { RiEmojiStickerFill } from "react-icons/ri"
import { HiMiniGif } from "react-icons/hi2"
import { useCable } from "../../context/cable"
import { Chat, Message } from "../../utils/types"
import { Subscription } from "@rails/actioncable"
import { createMessage } from "../../utils/chats"

function ChatRoom({ onClose, chat }): React.ReactElement {
  const { profileUser, currentUser } = useAuth()
  const { CableApp } = useCable()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [messages, setMessages] = useState<Message[] | null>(chat.messages)
  const [messageBody, setMessageBody] = useState("")

  useEffect(() => {
    if (!chat) {
      return
    }
    // setMessages(chat.messages)
    const subscription = CableApp.cable.subscriptions.create(
      {
        channel: "MessagingChannel",
        chat_id: chat.id,
      },
      {
        received: (data) => {
          console.log({ data })
          console.log({ messages })
          if (!messages?.some((message) => message.id === data.id)) {
            setMessages((prevMessages) => (prevMessages ? [...prevMessages, data] : [data]))
          }
          console.log({ messages })
        },
      }
    )
    setSubscription(subscription)
  }, [])

  const handleSendMessage = () => {
    if (subscription && messageBody.trim() !== "") {
      if (!currentUser) {
        return
      }
      console.log("sending message from:", currentUser)
      // subscription.send({ message: message })
      createMessage(chat.id, messageBody, currentUser.id)
      setMessageBody("")
    }
  }

  const handleChatLike = () => {
    if (currentUser && chat) {
      // sendMessageOptimistic(chat.id, "👍", currentUser.id)
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
        {chat?.messages &&
          messages?.map((msg) => (
            <div
              key={msg["id"]}
              className={msg["senderId"] === currentUser?.id ? "message-sent" : "message-received"}
            >
              {msg["body"]}
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
            value={messageBody}
            placeholder="Aa"
            onChange={(e) => setMessageBody(e.target.value)}
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

export default ChatRoom
