import React, { useEffect, useState } from "react"
import ProfileHeader from "./profile-header"
import { fetchUserProfile } from "../../utils/profile"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/auth"

function UserProfile(): React.ReactElement {
  const { profileUser, setProfileUser } = useAuth()
  const { profileIdParam } = useParams()

  useEffect(() => {
    if (profileIdParam !== undefined) {
      const profileId = parseInt(profileIdParam, 10)

      async function fetchProfile() {
        try {
          const profileUserData = await fetchUserProfile(profileId)
          setProfileUser(profileUserData)
        } catch (err) {
          console.error("Error in fetching the User Profile", err)
        }
      }

      fetchProfile()
    }
  }, [profileIdParam, setProfileUser])

  if (!profileUser) {
    return <div>Loading profile...</div>
  }

  return (
    <div className="profile-page">
      <div className="profile-header-container">
        <ProfileHeader />
      </div>
    </div>
  )
}

export default UserProfile
