import React from "react"
import { StrictMode } from "react"
import { HashRouter } from "react-router-dom"
import AuthProvider from "../context/auth"
import App from "./app"
import PostsProvider from "../context/posts"
import PhotosProvider from "../context/photos"
// import WebSocketProvider from "../context/websockets"
import { CableProvider } from "../context/cable"

function Root() {
  return (
    <StrictMode>
      <HashRouter>
        <AuthProvider>
          {/* <WebSocketProvider> */}
          <CableProvider>
            <PostsProvider>
              <PhotosProvider>
                <App />
              </PhotosProvider>
            </PostsProvider>
          </CableProvider>
          {/* </WebSocketProvider> */}
        </AuthProvider>
      </HashRouter>
    </StrictMode>
  )
}

export default Root
