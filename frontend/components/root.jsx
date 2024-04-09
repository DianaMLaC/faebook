import React, { StrictMode } from "react"
import { HashRouter } from "react-router-dom"
import AuthProvider from "../context/auth"
import App from "./app"

const Root = () => (
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        {console.log("inside root.jsx, in the authProvider tag")}
        <App />
      </AuthProvider>
    </HashRouter>
  </StrictMode>
)

export default Root
