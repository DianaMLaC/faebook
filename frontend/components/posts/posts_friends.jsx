import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchFriendships } from "../../utils/profile"
import Friend from "../friends/friend"

const PostsFriends = () => {
  const { profileUser } = useAuth()
  const [friends, setFriends] = useState(null)
  // const [pendingFriendships, setPendingFriendships] = useState([])

  useEffect(() => {
    async function getFriendshipsData() {
      try {
        const friendshipData = await fetchFriendships(profileUser.id)
        console.log(friendshipData)
        const displayFriends =
          friendshipData.length > 9 ? friendshipData.slice(0, 9) : friendshipData
        setFriends(displayFriends.length > 0 ? displayPhotos : null)
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    if (profileUser.id) {
      getFriendshipsData()
    }
  }, [profileUser])

  return (
    <div className="posts-friends-container">
      <header className="posts-friends-header">
        <div className="post-friends-title">
          <h4>Friends</h4>
          {friends && <div className="posts-friends-number">{friends.count} friends</div>}
        </div>
        <div className="see-friends">See All Friends</div>
      </header>
      <ul className="photos-display-grid">
        {friends && friends.map((friend) => <Friend key={friend.id} friend={friend} />)}
      </ul>
    </div>
  )
}

export default PostsFriends
