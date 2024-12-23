import React from "react"
import { useChat } from "../../context/chat"
import { icon } from "../../utils/helpers"

function MinimizedChats(): React.ReactElement {
  const { minimizedChats, restoreChat } = useChat()

  const handleRestoringChat = (chatId: string) => {
    restoreChat(chatId)
  }

  return (
    <div className="minimized-chats-component">
      {minimizedChats.length === 0 ? (
        <div className="no-minimized-chats"></div>
      ) : (
        <ul className="minimized-chats-list">
          {minimizedChats &&
            minimizedChats.map((chatWindow) => (
              <li key={chatWindow.chat.id} onClick={() => handleRestoringChat(chatWindow.chat.id)}>
                <div className="chat-receiver-avatar">
                  {chatWindow.chat.receiver.profilePhotoUrl ? (
                    <img
                      className="profile-photo"
                      src={chatWindow.chat.receiver.profilePhotoUrl}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="missing-profile-photo"
                      src={icon.noProfilePhoto}
                      alt="Faebook"
                    />
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default MinimizedChats
