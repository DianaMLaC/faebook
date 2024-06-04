import React, { useEffect } from "react"
import { useAuth } from "../context/auth"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import UserProfile from "./profile/profile_page"
import StartPage from "./session/start"
import NavBar from "./nav"
import PhotosPage from "./photos/photos_page"

const App = () => {
  const { currentUser, profileUser, setProfileUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setProfileUser(currentUser)
      navigate(`/profile-page/${currentUser.id}`, { replace: true })
      // console.log("currentUser:", currentUser)
    }
  }, [currentUser])

  console.dir({ currentUser })
  return (
    <Routes>
      <Route
        path="/start"
        element={
          <EnforceLoggedOut user={currentUser}>
            <StartPage />
          </EnforceLoggedOut>
        }
      />
      <Route path="/" element={<Navigate to="/start" replace />} />

      <Route
        path="/login"
        element={
          <EnforceLoggedOut user={currentUser}>
            <StartPage />
          </EnforceLoggedOut>
        }
      />
      <Route
        path="/signup"
        element={
          <EnforceLoggedOut user={currentUser}>
            <StartPage />
          </EnforceLoggedOut>
        }
      />

      {/* <Route element={currentUser ? <NavBar /> : <Navigate to="/start" replace />}> */}
      <Route
        path="/profile-page/:profileId"
        element={
          <EnforceLoggedIn user={currentUser}>
            {currentUser && <NavBar />}
            <UserProfile />
          </EnforceLoggedIn>
        }
      />

      <Route path="*" element={<Navigate to="/start" replace />} />
    </Routes>
  )
}
const EnforceLoggedOut = ({ user, children }) => {
  if (user) {
    return <Navigate to={`/profile-page/${user.id}`} replace />
  }

  return children
}

const EnforceLoggedIn = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/start" replace />
  }

  return children
}

export default App
