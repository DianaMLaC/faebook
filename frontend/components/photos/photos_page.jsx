import React from "react"
import { useAuth } from "../../context/auth"
import Albums from "./albums"

const PhotosPage = () => {
  const { currentUser } = useAuth()

  return (
    <div className="photos-container">
      <header className="photos-header"></header>
      <nav className="photos-nav"></nav>
      <div className="albums-page">
        <Albums />
      </div>
    </div>
  )
}

export default PhotosPage
