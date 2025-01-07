import React, { createContext, useContext, useState } from "react"
import { Chat, ActiveChats, MinimizedChats, ChatContextType } from "../utils/types"
import { initiateChat } from "../utils/axios"

interface ChatProviderProps {
  children: React.ReactNode
}

const ChatContext = createContext<ChatContextType | null>(null)

function ChatProvider({ children }: ChatProviderProps): React.ReactElement {
  const [activeChats, setActiveChats] = useState<ActiveChats[] | []>([])
  const [minimizedChats, setMinimizedChats] = useState<MinimizedChats[]>([])
  const MAX_OPEN_CHATS = 3

  // Function to open chat
  const openChat = async (senderId: string, receiverId: string) => {
    try {
      const chatResponse = await initiateChat(senderId, receiverId)
      console.log({ chatResponse })

      //check if chat is active
      const activeChat = activeChats.find((c) => c.chat.id === chatResponse.id)
      if (activeChat) {
        console.log("Chat already opened - ACTIVE")
        return
      }

      // Check if chat is already minimized
      const minimizedChat = minimizedChats.find((c) => c.chat.id === chatResponse.id)
      if (minimizedChat) {
        console.log("Chat already opened - MINIMIZED")
        restoreChat(chatResponse.id)
        return
      }

      // enforceLimit which adds it to ActiveChats
      enforceOpenedChats(chatResponse)
    } catch (error) {
      console.error("Error opening chat in ChatContext:", error)
    }
  }

  const addChat = (chatResponse: Chat): ActiveChats[] => {
    return [...activeChats, { chat: chatResponse, isMinimized: false }]
  }

  const enforceOpenedChats = (newChat: Chat) => {
    // check if queue is 3
    const updatedChats = addChat(newChat)
    if (updatedChats.length <= MAX_OPEN_CHATS) {
      setActiveChats(updatedChats)
    } else {
      // find old chat
      const oldChat = activeChats[0]
      // create an array newChats where we filter out (unshift) oldChat from updatedChats which has the newChat
      const filtered = updatedChats.filter((c) => c.chat.id !== oldChat.chat.id)
      setActiveChats(filtered)
      //change property of isMinimized
      const minimizedChat: MinimizedChats = {
        chat: oldChat.chat,
        isMinimized: true,
      }
      setMinimizedChats((prevMinimized) => [...prevMinimized, minimizedChat])
    }
  }

  // Function to close a chat
  const closeChat = (chatId: string) => {
    const chatActive = activeChats.find((c) => c.chat.id === chatId)
    if (chatActive) {
      setActiveChats((prevActive) => prevActive.filter((c) => c.chat.id !== chatId))
    }
    const chatMinimized = minimizedChats.find((c) => c.chat.id === chatId)
    if (chatMinimized) {
      setMinimizedChats((prevMinimized) => prevMinimized.filter((c) => c.chat.id !== chatId))
    }
  }

  // Function to minimize a chat
  const minimizeChat = (chatId: string) => {
    const chatToMinimize = activeChats.find((c) => c.chat.id === chatId)
    if (!chatToMinimize) return
    setActiveChats((prevActive) => prevActive.filter((c) => c.chat.id !== chatId))
    const minimizedChat: MinimizedChats = {
      chat: chatToMinimize.chat,
      isMinimized: true,
    }
    setMinimizedChats((prevMinimized) => [...prevMinimized, minimizedChat])
  }

  // Function to restore a minimized chat
  const restoreChat = (chatId: string) => {
    const chatToRestore = minimizedChats.find((c) => c.chat.id === chatId)
    if (!chatToRestore) return
    setMinimizedChats((prevMinimized) => prevMinimized.filter((c) => c.chat.id !== chatId))
    enforceOpenedChats(chatToRestore.chat)
  }

  return (
    <ChatContext.Provider
      value={{ activeChats, minimizedChats, minimizeChat, restoreChat, openChat, closeChat }}
    >
      {children}
    </ChatContext.Provider>
  )
}

function useChat(): ChatContextType {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

export { ChatProvider, useChat }
export default ChatProvider
