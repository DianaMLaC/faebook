import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import { useCable } from "../../context/cable"
import { fetchFriendships, initiateChat } from "../../utils/axios"
import { useFriends } from "../../context/friends"
import { Chat } from "../../utils/types"
import ChatRoom from "./chat"
import { icon } from "../../utils/helpers"

function ChatList() {
  const { currentUser } = useAuth()
  const [chat, setChat] = useState<Chat | null>(null)
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

  const { acceptedFriends, setAcceptedFriends } = useFriends()

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

  const openChat = async (userId) => {
    console.log("Opening messenger chat")
    if (!currentUser || !userId) {
      return
    }

    try {
      const chatResponse = await initiateChat(currentUser!.id, userId)
      console.log("initiated chat:", chatResponse.name)
      setChat(chatResponse)
    } catch (error) {
      console.error("Error fetching chat data:", error)
    }
    setIsChatOpen(true) // Open the chat
  }

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">Contacts</div>
      <ul className="chat-friends-list">
        {acceptedFriends &&
          acceptedFriends.map((friend) => (
            <li key={friend.id} onClick={() => openChat(friend.id)}>
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
      {isChatOpen && <ChatRoom chat={chat} onClose={() => setIsChatOpen(false)} />}
    </div>
  )
}

export default ChatList
