import React, { useState, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(window.currentUser || null)
  const navigate = useNavigate()

  const signup = async (newUserData) => {
    const dbUser = await postUser(newUserData)
    setCurrentUser(dbUser)
    navigate("/")
  }
}

export default AuthProvider
