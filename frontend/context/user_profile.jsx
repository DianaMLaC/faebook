import React, { createContext, useContext, useEffect, useState } from "react"

const UserProfileContext = createContext(null)

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null)

  const loadUserProfile = async (userId) => {
    const profileData = await fetchUserProfile(userId)
    setUserProfile(profileData)
  }

  useEffect(() => {
    if (currentUser) {
      loadUserProfile(currentUser.id)
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
