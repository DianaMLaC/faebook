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
import FriendsProvider from "../context/friends"
import FriendsPage from "./friends/friends_page"
import PhotosProvider from "../context/photos"
import PhotosPage from "./photos/photos-page"
import Videos from "./profile/videos"
import CheckIns from "./profile/check-ins"
import Music from "./profile/music"
import Books from "./profile/books"
import MessengerContainer from "./messenger/messenger_container"

const App = () => {
  const { currentUser, profileUser, setProfileUser } = useAuth()
  const navigate = useNavigate()
  // console.log("currentUser:", { currentUser })

  useEffect(() => {
    console.log("currentUser:", currentUser)
    if (currentUser) {
      setProfileUser(currentUser)
      navigate(`/profile-page/${currentUser.id}/posts`, { replace: true })
    }
    // navigate("/start")
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
            <MessengerContainer />
          </EnforceLoggedIn>
        }
      >
        <Route path="profile-page/:profileIdParam" element={<UserProfile />}>
          {/* <Route path="test" element={<BasicComponent />} /> */}

          <Route path="about" element={<AboutMe />} />
          <Route path="videos" element={<Videos />} />
          <Route path="checkins" element={<CheckIns />} />
          <Route path="music" element={<Music />} />
          <Route path="books" element={<Books />} />
          {/* <Route path="groups" element={<Groups />} /> */}

          <Route
            index
            path="posts"
            element={
              <PostsProvider>
                <PostsPage />
              </PostsProvider>
            }
          />
          <Route
            index
            path="friends"
            element={
              <FriendsProvider>
                <FriendsPage />
              </FriendsProvider>
            }
          />
          <Route
            index
            path="photos"
            element={
              <PhotosProvider>
                <PhotosPage />
              </PhotosProvider>
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
    return <Navigate to={`/profile-page/${user.id}/posts`} replace />
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
