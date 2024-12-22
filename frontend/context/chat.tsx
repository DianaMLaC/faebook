import React, { createContext, useContext, useState } from "react"
import { Chat, ChatWindow, ChatContextType } from "../utils/types"
import { initiateChat } from "../utils/axios"

interface ChatProviderProps {
  children: React.ReactNode
}

const ChatContext = createContext<ChatContextType | null>(null)

function ChatProvider({ children }: ChatProviderProps): React.ReactElement {
  const [activeChats, setActiveChats] = useState<ChatWindow[] | []>([])
  const [minimizedChats, setMinimizedChats] = useState<ChatWindow[]>([])
  const MAX_OPEN_CHATS = 3

  // Function to open chat
  const openChat = async (senderId: string, receiverId: string) => {
    try {
      const chatResponse = await initiateChat(senderId, receiverId)

      // Check if chat is already minimized
      const minimizedChat = minimizedChats.find((c) => c.chat.id === chatResponse.id)
      if (minimizedChat) {
        restoreChat(chatResponse.id)
        return
      }

      // Add to active chats
      setActiveChats((prevChats) => {
        if (isChatAlreadyOpen(prevChats, chatResponse.id)) {
          return prevChats
        }

        const updatedChats = addChat(prevChats, chatResponse)
        return enforceOpenChatLimit(updatedChats, MAX_OPEN_CHATS)
      })
    } catch (error) {
      console.error("Error opening chat in ChatContext:", error)
    }
  }

  // Utility functions
  const isChatAlreadyOpen = (activeChats: ChatWindow[], chatId: string): boolean => {
    return activeChats.some((c) => c.chat.id === chatId)
  }

  const addChat = (activeChats: ChatWindow[], chatResponse: Chat): ChatWindow[] => {
    return [...activeChats, { chat: chatResponse, isMinimized: false }]
  }

  const enforceOpenChatLimit = (activeChats: ChatWindow[], maxOpenChats: number): ChatWindow[] => {
    const openChatsCount = activeChats.filter((c) => !c.isMinimized).length

    if (openChatsCount > maxOpenChats) {
      const firstOpenChatIndex = activeChats.findIndex((c) => !c.isMinimized)
      if (firstOpenChatIndex !== -1) {
        const updatedChats = [...activeChats]
        updatedChats[firstOpenChatIndex].isMinimized = true
        return updatedChats
      }
    }

    return activeChats
  }

  // Function to close a chat
  const closeChat = (chatId: string) => {
    setActiveChats((prevChats) => prevChats.filter((c) => c.chat.id !== chatId))
  }

  // Function to toggle minimize/maximize state of a chat
  const toggleMinimizeChat = (chatId: string) => {
    setActiveChats((prevChats) =>
      prevChats.map((c) => (c.chat.id === chatId ? { ...c, isMinimized: !c.isMinimized } : c))
    )
  }

  // Function to minimize a chat
  const minimizeChat = (chatId: string) => {
    setActiveChats((prevChats) => {
      const chatToMinimize = prevChats.find((c) => c.chat.id === chatId)
      if (!chatToMinimize) return prevChats

      setMinimizedChats((prevMinimized) => [...prevMinimized, chatToMinimize])
      return prevChats.filter((c) => c.chat.id !== chatId)
    })
  }

  // Function to restore a minimized chat
  const restoreChat = (chatId: string) => {
    setMinimizedChats((prevMinimized) => {
      const chatToRestore = prevMinimized.find((c) => c.chat.id === chatId)
      if (!chatToRestore) return prevMinimized

      setActiveChats((prevChats) => {
        const updatedChats = [...prevChats, chatToRestore]
        return enforceOpenChatLimit(updatedChats, MAX_OPEN_CHATS)
      })

      return prevMinimized.filter((c) => c.chat.id !== chatId)
    })
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
