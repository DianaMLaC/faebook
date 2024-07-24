// src/context/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { createConsumer, Channel } from "@rails/actioncable"
import { WebSocketContextType, Message, Chat } from "../utils/types"
import { createChat } from "../utils/chats"

const cable = createConsumer("ws://localhost:3000/cable")

interface WebSocketProviderProps {
  children: React.ReactNode
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

function WebSocketProvider({ children }: WebSocketProviderProps): React.ReactElement {
  const [messages, setMessages] = useState<Message[]>([])
  const [chats, setChats] = useState<Chat[]>([])
  const [subscriptions, setSubscriptions] = useState<Record<string, Channel | null>>({})

  // Function to add a new message to the state
  const addMessage = (newMessage: Message): void => {
    setMessages((prevMessages): Message[] => [newMessage, ...prevMessages])
  }

  // Function to send a message through the WebSocket
  const sendMessage = (chatId: string, body: string): void => {
    const subscription = subscriptions[chatId]
    if (subscription) {
      subscription.perform("send_message", { chat_id: chatId, body })
    }
  }

  // Function to fetch messages for a specific chat
  const fetchMessages = async (chatId: string): Promise<Message[]> => {
    const response = await fetch(`/api/chats/${chatId}/messages`)
    const data = await response.json()
    return data.messages
  }

  // Function to create a chat or fetch an existing one, and subscribe to it
  const initiateChat = async (recipientId) => {
    const chat = await createChat(recipientId)
    subscribeToChat(chat.id)
    setChats((prevChats) => ({
      ...prevChats,
      [chat.id]: chat,
    }))
    return chat
  }

  // Function to subscribe to a chat channel
  const subscribeToChat = (chatId: string) => {
    if (subscriptions[chatId]) return

    const subscription = cable.subscriptions.create(
      { channel: "ChatChannel", chat_id: chatId },
      {
        received(data) {
          addMessage(data.message)
        },
      }
    )

    setSubscriptions((prevSubscriptions) => ({
      ...prevSubscriptions,
      [chatId]: subscription,
    }))
  }

  let subscription: Channel | null = null

  // useEffect to set up the WebSocket subscription
  useEffect(() => {
    return () => {
      Object.values(subscriptions).forEach((subscription) => {
        if (subscription) {
          cable.subscriptions.remove(subscription)
        }
      })
    }
  }, [subscriptions])

  return (
    <WebSocketContext.Provider
      value={{
        messages,
        chats,
        sendMessage,
        fetchMessages,
        initiateChat,
        subscribeToChat,
      }}
    >
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
