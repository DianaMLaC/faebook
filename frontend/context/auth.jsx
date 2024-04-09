import React, { useState, createContext, useContext } from "react"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(window.authenticatedUser || null)
}
