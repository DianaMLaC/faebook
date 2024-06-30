import React, { useEffect } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import UserProfile from "./profile/profile_page"
import StartPage from "./session/start"
import NavBar from "./nav"
import { useAuth } from "../context/auth"
import PhotoViewer from "./photos/photo-viewer"
import PostsProvider from "../context/posts"
import PostsPage from "./posts/posts_page"
import AboutMe from "./user_profile_details/about-me"

const App = () => {
  const { currentUser, profileUser, setProfileUser } = useAuth()
  const navigate = useNavigate()
  // console.log("currentUser:", { currentUser })

  useEffect(() => {
    if (currentUser) {
      setProfileUser(currentUser)
      navigate(`/profile-page/${currentUser.id}/posts`, { replace: true })
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
        path="/"
        element={
          <EnforceLoggedIn user={currentUser}>
            <NavBar />
          </EnforceLoggedIn>
        }
      >
        <Route path="profile-page/:profileIdParam" element={<UserProfile />}>
          <Route path="test" element={<BasicComponent />} />

          <Route path="about" element={<AboutMe />} />
          <Route
            index
            path="posts"
            element={
              <PostsProvider>
                <PostsPage />
              </PostsProvider>
            }
          />
        </Route>

        <Route path="photo/:photoId" element={<PhotoViewer />} />
      </Route>

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

function BasicComponent() {
  console.log("basic rendered")
  return <div>some text</div>
}

const EnforceLoggedIn = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/start" replace />
  }

  return children
}

export default App
