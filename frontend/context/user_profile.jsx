import React, { createContext, useContext, useEffect, useState } from "react"
import { fetchUserProfile } from "../utils/profile"
import { useAuth } from "./auth"
const UserProfileContext = createContext(null)

const UserProfileProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [userProfile, setUserProfile] = useState(null)

  const loadUserProfile = async (userId) => {
    const profileData = await fetchUserProfile(userId)
    setUserProfile(profileData)
  }

  useEffect(() => {
    if (currentUser && currentUser.user) {
      loadUserProfile(currentUser.user.id)
    }
  }, [currentUser])

  return (
    <UserProfileContext.Provider value={{ userProfile, loadUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfile = () => {
  return useContext(UserProfileContext)
}

export default UserProfileProvider
