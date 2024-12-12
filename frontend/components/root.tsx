import React from "react"
import { StrictMode } from "react"
import { HashRouter } from "react-router-dom"
import AuthProvider from "../context/auth"
import App from "./app"
import PostsProvider from "../context/posts"
import PhotosProvider from "../context/photos"
import { CableProvider } from "../context/cable"
import FriendsProvider from "../context/friends"

function Root() {
  return (
    // <StrictMode>
    <HashRouter>
      <AuthProvider>
        <CableProvider>
          <PostsProvider>
            <PhotosProvider>
              <FriendsProvider>
                <App />
              </FriendsProvider>
            </PhotosProvider>
          </PostsProvider>
        </CableProvider>
      </AuthProvider>
    </HashRouter>
    // </StrictMode>
  )
}

export default Root
