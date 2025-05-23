import React, { useState } from "react"
import Albums from "./album-index"
import PhotosIndex from "./photos-index"
import Videos from "../profile/videos"
import CheckIns from "../profile/check-ins"
import Music from "../profile/music"
import Books from "../profile/books"

function PhotosPage(): React.ReactElement {
  const [activeView, setActiveView] = useState("allPhotos")
  const [activeLink, setActiveLink] = useState("allPhotos")

  const handleViewChange = (e, view) => {
    e.preventDefault()
    setActiveView(view)
    setActiveLink(view)
  }

  const getViewComponent = (): React.ReactElement | null => {
    switch (activeView) {
      case "albums":
        return <Albums />
      case "allPhotos":
        return <PhotosIndex />
      default:
        return null
    }
  }

  return (
    <>
      <div className="photos-container">
        <header className="photos-header">
          <h2>Photos</h2>

          <div>
            {/* <button className="add-photo-button">Add photos/video</button> */}
            {/* <div className="photo-header-more-button">...</div> */}
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
      <div className="profile-videos-container">
        <Videos />
      </div>
      <div className="profile-check-ins-container">
        <CheckIns />
      </div>
      <div className="profile-music-container">
        <Music />
      </div>
      <div className="profile-books-container">
        <Books />
      </div>
    </>
  )
}

export default PhotosPage
