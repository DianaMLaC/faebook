import React from "react"
import { StrictMode } from "react"
import { HashRouter } from "react-router-dom"
import AuthProvider from "../context/auth"
import App from "./app"
import PostsProvider from "../context/posts"
import PhotosProvider from "../context/photos"

function Root() {
  return (
    <StrictMode>
      <HashRouter>
        <AuthProvider>
          <PostsProvider>
            <PhotosProvider>
              <App />
            </PhotosProvider>
          </PostsProvider>
        </AuthProvider>
      </HashRouter>
    </StrictMode>
  )
}

export default Root
