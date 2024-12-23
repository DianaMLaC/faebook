import React, { useState, useEffect, useRef } from "react"
import { useAuth } from "../../context/auth"
import { IoClose } from "react-icons/io5"
import { FaMinus } from "react-icons/fa6"
import { TbPhotoFilled } from "react-icons/tb"
import { MdEmojiEmotions } from "react-icons/md"
import { BiSolidLike } from "react-icons/bi"
import { RiEmojiStickerFill } from "react-icons/ri"
import { HiMiniGif } from "react-icons/hi2"
import { useCable } from "../../context/cable"
import { Message } from "../../utils/types"
import { createMessage } from "../../utils/axios"
import { icon } from "../../utils/helpers"
import { useChat } from "../../context/chat"

function ChatRoom({ chat }): React.ReactElement {
  const { currentUser } = useAuth()
  const { CableApp } = useCable()
  const { closeChat, minimizeChat } = useChat()
  const [messages, setMessages] = useState<Message[] | null>(chat.messages)
  const [messageBody, setMessageBody] = useState("")
  // const [hasEffectRun, setHasEffectRun] = useState(false)

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-room")
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // if (!chat || !CableApp.cable || hasEffectRun) {
    //   return
    // }
    if (!chat || !CableApp.cable) {
      return
    }

    const subscription = CableApp.cable.subscriptions.create(
      {
        channel: "MessagingChannel",
        chat_id: chat.id,
      },
      {
        received: (data) => {
          if (!messages?.some((message) => message.id === data.id)) {
            setMessages((prevMessages) => (prevMessages ? [...prevMessages, data] : [data]))
          }
          // console.log({ messages })
        },
      }
    )
    // setHasEffectRun(true)
  }, [])

  const handleSendMessage = () => {
    if (currentUser && messageBody.trim() !== "") {
      createMessage(chat.id, messageBody, currentUser.id)
      setMessageBody("")
    }
  }

  const handleMinimize = () => {
    minimizeChat(chat.id)
  }

  const handleClose = () => {
    closeChat(chat.id)
  }

  const handleChatLike = () => {
    if (currentUser && chat) {
      // sendMessageOptimistic(chat.id, "👍", currentUser.id)
    }
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="chat-header-user">
          <div className="avatar">
            {chat.receiver.profilePhotoUrl ? (
              <img className="profile-photo" src={chat.receiver.profilePhotoUrl} alt="Profile" />
            ) : (
              <img className="missing-profile-photo" src={icon.noProfilePhoto} alt="Faebook" />
            )}
          </div>
          <div className="chat-header-user-details">
            <div className="post-user-display-name">{chat.receiver.displayName}</div>
            <div className="user-active-ago-time">Active 25 m ago</div>
          </div>
        </div>
        <div className="chat-header-buttons">
          <div onClick={handleMinimize}>
            <FaMinus />
          </div>
          <div onClick={handleClose}>
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
              if (e.key === "Enter") {
                handleSendMessage()
                console.log("message sent")
              }
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
