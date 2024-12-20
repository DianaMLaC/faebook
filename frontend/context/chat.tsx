import React, { createContext, useContext, useState } from "react"
import { Chat, ChatContextType } from "../utils/types"
import { initiateChat } from "../utils/axios"

interface ChatProviderProps {
  children: React.ReactNode
}

const ChatContext = createContext<ChatContextType | null>(null)

function ChatProvider({ children }: ChatProviderProps): React.ReactElement {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = async (senderId, receiverId) => {
    if (!senderId || !receiverId) {
      return
    }

    try {
      const chatResponse = await initiateChat(senderId, receiverId)
      setCurrentChat(chatResponse)
      setIsChatOpen(true)
    } catch (error) {
      console.error("Error initiating chat in Chat Provider", error)
    }
  }

  const closeChat = () => {
    setCurrentChat(null)
    setIsChatOpen(false)
  }

  return (
    <ChatContext.Provider value={{ currentChat, isChatOpen, openChat, closeChat }}>
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
