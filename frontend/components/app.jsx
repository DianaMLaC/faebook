import React from "react"
import { useAuth } from "../context/auth"
import { Route, Routes, Navigate } from "react-router-dom"
import UserProfile from "./profile"
import StartPage from "./session/start"
import Login from "./session/login"

const Protected = ({ children }) => {
  const auth = useAuth()
  if (auth.currentUser) {
    return <Navigate to="/" />
  }
  return children
}

const AuthRoute = ({ authorized, notAuthorized }) => {
  const auth = useAuth()
  if (auth.currentUser) {
    return authorized
  }
  return notAuthorized
}

const App = () => (
  <div>
    <Routes>
      {console.log("inside app.jsx, in the Routes tag")}
      <Route
        path="/"
        element={<AuthRoute authorized={<UserProfile />} notAuthorized={<StartPage />} />}
      ></Route>
      <Route
        path="login"
        element={
          <Protected>
            <Login />
          </Protected>
        }
      />
    </Routes>
  </div>
)

export default App
