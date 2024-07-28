import React, { useState, useEffect } from "react"
import { useCable } from "../../context/cable"
import { Message } from "../../utils/types"
import { useAuth } from "../../context/auth"

function MessagesBox({ chatId, messages, setMessages }): React.ReactElement {
  const { CableApp } = useCable()
  const { currentUser } = useAuth()

  useEffect(() => {
    const subscription = CableApp.cable.subscriptions.create(
      { channel: "MessagingChannel", chat_id: chatId },
      {
        received: (data: { message: Message }) => {
          console.log(data)
          setMessages((prevMessages) => [...prevMessages, data.message])
        },
      }
    )
  }, [CableApp, chatId])

  return (
    <div className="chat-room">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={msg.senderId === currentUser?.id ? "message-sent" : "message-received"}
        >
          {msg.body}
        </div>
      ))}
    </div>
  )
}

export default MessagesBox
