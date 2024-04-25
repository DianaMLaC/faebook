import React from "react"
import { useAuth } from "../context/auth"
import { Route, Routes, Navigate } from "react-router-dom"
import UserProfile from "./profile/profile_page"
import StartPage from "./session/start"
import NavBar from "./nav"
import PhotosPage from "./photos/photos_page"

const App = () => {
  const { currentUser } = useAuth()

  return (
    <Routes>
      <Route path="/start" element={<StartPage />} />
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/profile-page" replace /> : <StartPage />}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/profile-page" replace /> : <StartPage />}
      />

      <Route element={currentUser ? <NavBar /> : <Navigate to="/start" replace />}>
        <Route path="/profile-page" element={<UserProfile />}></Route>
      </Route>

      <Route path="*" element={<Navigate to="/start" replace />} />

      <Route
        path="/"
        element={
          currentUser ? <Navigate to="/profile-page" replace /> : <Navigate to="/start" replace />
        }
      />
    </Routes>
  )
}

export default App
