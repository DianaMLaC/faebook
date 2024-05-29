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

  // useEffect(() => {
  //   if (currentUser) {
  //     setProfileUser(currentUser)
  //     navigate(`/profile-page/${profileUser.id}`, { replace: true })
  //     // console.log("currentUser:", currentUser)
  //   }
  // }, [currentUser, navigate])

  return (
    <Routes>
      <Route path="/start" element={<StartPage />} />
      <Route path="/" element={<Navigate to="/start" replace />} />

      {/* <Route
        path="/login"
        element={currentUser ? <Navigate to="/profile-page/" replace /> : <StartPage />}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/profile-page" replace /> : <StartPage />}
      /> */}

      <Route
        path="/login"
        element={
          currentUser ? <Navigate to={`/profile-page/${currentUser.id}`} replace /> : <StartPage />
        }
      />
      <Route
        path="/signup"
        element={
          currentUser ? <Navigate to={`/profile-page/${currentUser.id}`} replace /> : <StartPage />
        }
      />

      <Route element={currentUser ? <NavBar /> : <Navigate to="/start" replace />}>
        <Route path="/profile-page/:profileId" element={<UserProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/start" replace />} />
    </Routes>
  )
}

export default App
