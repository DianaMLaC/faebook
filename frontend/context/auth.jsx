import React, { useState, createContext, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postUser, postSession, deleteSession } from "../utils/authentication"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem("currentUser")
    const initialUser = savedUser
      ? JSON.parse(savedUser)
      : { user: window.currentUser || null, profilePhotoUrl: null, coverPhotoUrl: null }
    return initialUser
  })

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      sessionStorage.removeItem("currentUser")
    }
  }, [currentUser])

  const signup = async (newUserData) => {
    const dbUser = await postUser(newUserData)
    setCurrentUser(dbUser)
    navigate("/")
  }

  const login = async (userData) => {
    const dbUser = await postSession(userData)
    setCurrentUser(dbUser)
    navigate("/profile-page")
  }

  const logout = async () => {
    try {
      await deleteSession()
      setCurrentUser(null)
      navigate("/")
    } catch (err) {
      console.error("Error caught in AuthProvider logout:", err)
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
