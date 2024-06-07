import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import Albums from "./albums_index"
import PhotoUpload from "../profile/photo_uploader"
import PhotosIndex from "./photos_index"

const PhotosPage = () => {
  const [activeView, setActiveView] = useState("allPhotos")
  const [activeLink, setActiveLink] = useState("allPhotos")

  const handleViewChange = (e, view) => {
    e.preventDefault()
    setActiveView(view)
    setActiveLink(view)
  }

  const getViewComponent = () => {
    switch (activeView) {
      case "albums":
        return <Albums />
      case "allPhotos":
        return <PhotosIndex />
      case "taggedPhotos":
        return <Photos tagged />
      default:
        return null
    }
  }

  return (
    <div className="photos-container">
      <header className="photos-header">
        <h2>Photos</h2>

        <div>
          <button className="add-photo-button">Add photos/video</button>
          <div className="photo-header-more-button">...</div>
        </div>
      </header>
      <nav className="photos-nav">
        <a
          href="#tagged-photos"
          onClick={(e) => handleViewChange(e, "taggedPhotos")}
          className={activeLink === "taggedPhotos" ? "active" : ""}
        >
          Photos of You
        </a>
        <a
          href="#user-uploaded-photos-all"
          onClick={(e) => handleViewChange(e, "allPhotos")}
          className={activeLink === "allPhotos" ? "active" : ""}
        >
          Your Photos
        </a>
        <a
          href="#albums"
          onClick={(e) => handleViewChange(e, "albums")}
          className={activeLink === "albums" ? "active" : ""}
        >
          Albums
        </a>
      </nav>
      <div className="photos-link-page">{getViewComponent()}</div>
    </div>
  )
}

export default PhotosPage
