import React, { useState, createContext, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUserProfile } from "../utils/profile"
import { User, NewUserData, SessionData } from "../utils/types"
import { postUser, postSession, deleteSession } from "../utils/authentication"

interface AuthContextType {
  currentUser: User | null
  profileUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  setProfileUser: React.Dispatch<React.SetStateAction<User | null>>
  signup: (newUserData: any) => Promise<void>
  login: (userData: any) => Promise<void>
  logout: () => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const navigate = useNavigate()
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = sessionStorage.getItem("currentUser")
    const initialUser = savedUser
      ? JSON.parse(savedUser)
      : { ...window.currentUser, profilePhotoUrl: null, coverPhotoUrl: null }
    return initialUser
  })

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      sessionStorage.removeItem("currentUser")
    }
  }, [currentUser])

  async function loadUserProfile(userId: number) {
    const profileData = await fetchUserProfile(userId)
    console.log("loading user profile:", profileData)
    setProfileUser(profileData)
  }

  async function signup(newUserData: NewUserData) {
    const dbUser = await postUser(newUserData)
    setCurrentUser(dbUser)
    navigate("/")
  }

  async function login(userData: SessionData) {
    const dbUser = await postSession(userData)
    setCurrentUser(dbUser)
    navigate("/profile-page")
  }

  async function logout() {
    deleteSession()
    setCurrentUser(null)
    setProfileUser(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, profileUser, setCurrentUser, setProfileUser, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
export default AuthProvider
