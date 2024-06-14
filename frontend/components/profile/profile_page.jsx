import React, { useEffect, useState } from "react"
import ProfileHeader from "./profile-header-ts"
import { fetchUserProfile } from "../../utils/profile"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/auth"

const UserProfile = () => {
  const { profileUser, setProfileUser } = useAuth()
  const { profileId } = useParams()

  useEffect(() => {
    if (profileId === null) {
      console.log("no profile id")
      return
    }

    async function fetchProfile() {
      try {
        const profileUserData = await fetchUserProfile(profileId)
        // console.log("profileUserData", { profileUserData })
        setProfileUser(profileUserData)
        // console.log("profileUserState:", profileUser)
      } catch (err) {
        console.error("Error in fetching the User Profile", err)
      }
    }

    fetchProfile()
  }, [profileId, setProfileUser])

  useEffect(() => {
    // console.log("Updated profileUser state:", profileUser)
  }, [profileId])

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
