import React, { createContext, useContext, useState } from "react"
import { Chat, ChatContextType } from "../utils/types"

interface ChatProviderProps {
  children: React.ReactNode
}

const ChatContext = createContext<ChatContextType | null>(null)

function ChatProvider({ children }: ChatProviderProps): React.ReactElement {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = (chat: Chat) => {
    setCurrentChat(chat)
    setIsChatOpen(true)
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
