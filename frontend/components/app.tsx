import React, { useEffect } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import UserProfile from "./profile/profile_page"
import StartPage from "./session/start"
import NavBar from "./nav"
import { useAuth } from "../context/auth"
import PhotoViewer from "./photos/photo-viewer"

const App = () => {
  const { currentUser, profileUser, setProfileUser } = useAuth()
  const navigate = useNavigate()
  // console.log("currentUser:", { currentUser })

  useEffect(() => {
    if (currentUser) {
      setProfileUser(currentUser)
      navigate(`/profile-page/${currentUser.id}`, { replace: true })
      // console.log("currentUser:", currentUser)
    }
  }, [currentUser])

  // console.dir({ currentUser })
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

      <Route
        path="/profile-page/:profileIdParam"
        element={
          <EnforceLoggedIn user={currentUser}>
            {currentUser && <NavBar />}
            <UserProfile />
          </EnforceLoggedIn>
        }
      />

      <Route path="/photo/:photoId" element={<PhotoViewer />} />

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
