import React, { useState, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { postUser, postSession, deleteSession } from "../utils/authentication"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(window.currentUser || null)
  const navigate = useNavigate()

  const signup = async (newUserData) => {
    const dbUser = await postUser(newUserData)
    setCurrentUser(dbUser)
    navigate("/")
  }

  const login = async (userData) => {
    const dbUser = await postSession(userData)
    setCurrentUser(dbUser)
    navigate("/")
  }

  const logout = async () => {
    try {
      await deleteSession()
      setCurrentUser(null)
      navigate("/")
    } catch (err) {
      console.error("Error caught in AuthProvider logout:", err)
    }

    return (
      <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
