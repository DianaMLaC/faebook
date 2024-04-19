import React from "react"
import { useAuth } from "../../context/auth"
import ProfileHeader from "./profile_header"

const UserProfile = () => {
  const { currentUser } = useAuth()
  const { logout } = useAuth()

  return (
    <div className="profile-page">
      <div className="profile-header-container">
        <ProfileHeader />
      </div>
      <h1>Welcome, {currentUser.displayName}</h1>
      {console.log(currentUser)}
      <h5>This will be our user profile on which we are redirected after authentication</h5>
    </div>
  )
}

export default UserProfile
