// src/components/FriendsMenu.tsx
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useWebSocket } from "../../context/websockets"
import { Friendship, User, Chat } from "../../utils/types"
import { useAuth } from "../../context/auth"
import { fetchFriendships } from "../../utils/profile"

// interface MessengerMenuProps {
//   currentUser: User
//   onOpenChat: (chat: Chat) => void
// }

function MessengerMenu({ onOpenChat }): React.ReactElement {
  const [friends, setFriends] = useState<Friendship[]>([])
  const { currentUser } = useAuth()

  useEffect(() => {
    async function getFriendshipsData() {
      try {
        if (currentUser) {
          const friendshipData = await fetchFriendships(currentUser.id)

          setFriends(friendshipData.friends.accepted)
        }
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    getFriendshipsData()
  }, [currentUser, setFriends])

  const handleFriendClick = (friend: User) => {
    // Open chat with the selected friend
    axios.post("/api/chats", { user_id: friend.id }).then((response) => {
      onOpenChat(response.data)
    })
  }

  return (
    <div className="friends-menu">
      <h3>Friends</h3>
      <ul className="messenger-menu">
        {friends.map((friend) => (
          <li key={friend.user.id} onClick={() => handleFriendClick(friend.user)}>
            <div className="messenger-friend-avatar">
              {friend.user.profilePhotoUrl ? (
                <img
                  className="friend-cover-"
                  src={friend.user.profilePhotoUrl}
                  alt={friend.user.displayName}
                />
              ) : (
                <img
                  className="missing-profile-photo"
                  src="/assets/images/missing-profile-pic.png"
                  alt="Faebook"
                />
              )}
            </div>
            <div className="messenger-friend-name">{friend.user.displayName}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MessengerMenu
