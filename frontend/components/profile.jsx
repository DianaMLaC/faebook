import React from "react"
import { useAuth } from "../context/auth"

const UserProfile = () => {
  const { currentUser } = useAuth()
  const { logout } = useAuth()

  return (
    <div>
      <h1>Welcome, {currentUser.displayName}</h1>
      {console.log(currentUser)}
      <h5>This will be our user profile on which we are redirected after authentication</h5>
    </div>
  )
}

export default UserProfile
