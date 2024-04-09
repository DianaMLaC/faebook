import React from "react"
import Login from "./login"

const StartPage = () => (
  <div className="start-page">
    <div>
      <div className="faebook-title">
        <p>faebook</p>
      </div>
      <div className="faebook-motto">
        <p>Connect with friends and the world around you on Facebook.</p>
      </div>
    </div>
    <div className="login-container">
      <Login />
    </div>
  </div>
)

export default StartPage
