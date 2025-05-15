import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import { fetchFriendships } from "../../utils/axios"
import { useFriends } from "../../context/friends"
import { icon } from "../../utils/helpers"
import { useChat } from "../../context/chat"

function ChatList(): React.ReactElement {
  const { currentUser } = useAuth()
  const { openChat } = useChat()
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

  const handleOpenChat = (friendId: string) => {
    if (currentUser?.id) {
      openChat(currentUser.id, friendId) // Pass sender and receiver IDs
    }
  }

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">Contacts</div>
      <ul className="chat-friends-list">
        {acceptedFriends?.map((friend) => (
          <li key={friend.id} onClick={() => handleOpenChat(friend.id)}>
            <div className="friend-item">
              <div className="avatar">
                {friend.profilePhotoUrl ? (
                  <img className="profile-photo" src={friend.profilePhotoUrl} alt="Profile" />
                ) : (
                  <img className="missing-profile-photo" src={icon.noProfilePhoto} alt="Faebook" />
                )}
              </div>
              <div className="post-user-display-name">{friend.displayName}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatList
