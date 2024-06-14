import React from "react"
import { StrictMode } from "react"
import { HashRouter } from "react-router-dom"
import AuthProvider from "../context/auth"
import App from "./app"

function Root() {
  return (
    <StrictMode>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </StrictMode>
  )
}

export default Root
