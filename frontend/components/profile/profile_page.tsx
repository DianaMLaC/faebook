import React, { useEffect, useState } from "react"
import ProfileHeader from "./profile-header"
import { fetchUserProfile } from "../../utils/profile"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/auth"

function UserProfile(): React.ReactElement {
  const { profileUser, setProfileUser } = useAuth()
  const { profileIdParam } = useParams<{ profileIdParam: string }>()

  // console.log({ profileIdParam })

  useEffect(() => {
    const fetchProfile = async (profileId: string) => {
      try {
        const profileUserData = await fetchUserProfile(profileId)
        console.log("Fetched profileUserData:", profileUserData) // Log fetched data
        setProfileUser(profileUserData)
      } catch (err) {
        console.error("Error in fetching the User Profile", err)
      }
    }
    if (profileIdParam) {
      fetchProfile(profileIdParam)
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
