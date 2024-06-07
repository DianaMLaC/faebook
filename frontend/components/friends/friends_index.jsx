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
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    if (profileUser.id) {
      getFriendshipsData()
    }
  }, [profileUser])

  return (
    <div className="friends-container">
      <header className="friends-header">
        <h4>Friends</h4>
        <div className="see-friends">See All Friends</div>
      </header>
    </div>
  )
}

export default Friends
