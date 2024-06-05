import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchFriendships } from "../../utils/profile"

const Friends = () => {
  const { profileUser } = useAuth()
  const [acceptedFriendships, setAcceptedFriendships] = useState([])
  const [pendingFriendships, setPendingFriendships] = useState([])

  useEffect(() => {
    async function getFriendshipsData() {
      try {
        const friendshipData = await fetchFriendships(profileUser.id)
        console.log(friendshipData)
        setAcceptedFriendships(friendshipData.friendships.accepted)
        setPendingFriendships(friendshipData.friendships.pending)
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    if (profileUser.id) {
      getFriendshipsData()
    }
  }, [profileUser])

  return (
    <div className="friends-component">
      <span>Friends</span>
    </div>
  )
}

export default Friends
