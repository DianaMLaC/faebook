import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import { useCable } from "../../context/cable"
import { fetchFriendships, initiateChat } from "../../utils/axios"
import { useFriends } from "../../context/friends"
import { Chat, User } from "../../utils/types"
import ChatRoom from "./chat_room"
import { icon } from "../../utils/helpers"
import { useChat } from "../../context/chat"

function ChatList() {
  const { currentUser } = useAuth()
  const { openChat, isChatOpen, currentChat } = useChat()
  const { acceptedFriends, setAcceptedFriends } = useFriends()
  const [receiver, setReceiver] = useState<User | null>(null)

  useEffect(() => {
    async function getFriendshipsData() {
      try {
        if (currentUser) {
          const friendshipData = await fetchFriendships(currentUser.id)
          if (friendshipData) {
            setAcceptedFriends(friendshipData.friends.accepted)
          }
        }
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    getFriendshipsData()
  }, [currentUser])

  const handleOpenChat = (receiverArg) => {
    setReceiver(receiverArg)
    openChat(currentUser!.id, receiverArg.id)
  }
  return (
    <>
      <div className="chat-list-container">
        <div className="chat-list-header">Contacts</div>
        <ul className="chat-friends-list">
          {acceptedFriends &&
            acceptedFriends.map((friend) => (
              <li key={friend.id} onClick={() => handleOpenChat(friend)}>
                <div className="friend-item">
                  <div className="avatar">
                    {friend.profilePhotoUrl ? (
                      <img className="profile-photo" src={friend.profilePhotoUrl} alt="Profile" />
                    ) : (
                      <img
                        className="missing-profile-photo"
                        src={icon.noProfilePhoto}
                        alt="Faebook"
                      />
                    )}
                  </div>
                  <div className="post-user-display-name">{friend.displayName}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {isChatOpen && <ChatRoom chat={currentChat} />}
    </>
  )
}

export default ChatList
