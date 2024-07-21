// src/context/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { createConsumer, Channel } from "@rails/actioncable"
import { WebSocketContextType, Message } from "../utils/types" // Import necessary types

const cable = createConsumer("ws://localhost:3000/cable")

interface WebSocketProviderProps {
  children: React.ReactNode
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

function WebSocketProvider({ children }: WebSocketProviderProps): React.ReactElement {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = (newMessage: Message): void => {
    setMessages((prevMessages): Message[] => [newMessage, ...prevMessages])
  }

  const sendMessage = (chatId: string, body: string): void => {
    if (subscription) {
      subscription.perform("send_message", { chat_id: chatId, body })
    }
  }

  let subscription: Channel | null = null

  useEffect(() => {
    subscription = cable.subscriptions.create("ChatChannel", {
      received(data) {
        addMessage(data.message)
      },
    })

    return () => {
      if (subscription) {
        cable.subscriptions.remove(subscription)
      }
    }
  }, [])

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  )
}

function useWebSocket(): WebSocketContextType {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}

export { WebSocketProvider, useWebSocket }
export default WebSocketProvider
