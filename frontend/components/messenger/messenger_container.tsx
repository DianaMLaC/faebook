import React from "react"
import { useChat } from "../../context/chat"
import MinimizedChats from "./minimized_chats"
import ChatRoom from "./chat_room"

function MessengerContainer(): React.ReactElement {
  const { activeChats, minimizedChats } = useChat()

  const hasChats = activeChats.length > 0 || minimizedChats.length > 0

  return hasChats ? (
    <div className="messenger-container">
      {/* Render open chats */}
      <div className="open-chats">
        {activeChats.map((chatWindow) => (
          <ChatRoom key={chatWindow.chat.id} chat={chatWindow.chat} />
        ))}
      </div>

      {/* Render minimized chats */}
      <MinimizedChats />
    </div>
  ) : (
    <div className="messenger-container empty-state"></div>
  )
}

export default MessengerContainer
