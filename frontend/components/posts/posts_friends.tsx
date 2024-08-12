import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchFriendships } from "../../utils/axios"
import PostsFriend from "./posts_friend"
import { FriendshipFriend } from "../../utils/types"
import { useNavigate } from "react-router-dom"

function PostsFriends(): React.ReactElement {
  const { profileUser } = useAuth()
  const [friends, setFriends] = useState<FriendshipFriend[] | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function getFriendshipsData() {
      try {
        if (profileUser) {
          const friendshipData = await fetchFriendships(profileUser.id)
          // console.log(friendshipData)
          // console.log(friendshipData.friends.accepted)
          const accepted_friends = friendshipData.friends.accepted
          const displayFriends =
            accepted_friends.length > 9 ? accepted_friends.slice(0, 9) : accepted_friends
          setFriends(displayFriends.length > 0 ? displayFriends : null)
        }
      } catch (error) {
        console.error("Error fetching friendship data:", error)
      }
    }

    getFriendshipsData()
  }, [profileUser])

  const handleSeeAllFriendsClick = () => {
    if (profileUser) {
      navigate(`/profile-page/${profileUser.id}/friends`)
    }
  }

  return (
    <div className="posts-friends-container">
      <header className="posts-friends-header">
        <h2>Friends</h2>
        {/* {friends && <div className="posts-friends-number">{friends.count} friends</div>} */}

        <div className="see-friends" onClick={handleSeeAllFriendsClick}>
          See All Friends
        </div>
      </header>
      <ul className="friends-display-grid">
        {friends &&
          friends.map((friend) => <PostsFriend key={friend.friendshipId} friend={friend} />)}
      </ul>
    </div>
  )
}

export default PostsFriends
