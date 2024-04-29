import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import Albums from "./albums"
import PhotoUpload from "../profile/photo_uploader"
import Photos from "./photos_index"

const PhotosPage = () => {
  const [toggleAlbums, setToggleAlbums] = useState(false)
  const [togglePhotos, setTogglePhotos] = useState(false)
  const [activeLink, setActiveLink] = useState(null)

  const handleAlbumsClick = (e, link) => {
    e.preventDefault()
    if (togglePhotos) {
      setTogglePhotos(false)
    }
    setToggleAlbums(true)
    setActiveLink(link)
  }

  const handlePhotosClick = (e, link) => {
    e.preventDefault()
    if (toggleAlbums) {
      setToggleAlbums(false)
    }
    setTogglePhotos(true)
    setActiveLink(link)
  }
  return (
    <div className="photos-container">
      <header className="photos-header">
        <div>
          <h4>Photos</h4>
        </div>
        <div>
          <button className="add-photo-button">
            {/* photo uploader and input for hidden from timeline*/}Add photos/video
          </button>
          <div className="photo-header-more-button">
            ...
            {/* the more image and a pop-up See photos hidden from timeline*/}
          </div>
        </div>
      </header>
      <nav className="photos-nav">
        <a href="#tagged-photos">Photos of You</a>
        <a
          href="#user-uploaded-photos-all"
          onClick={(e) => handlePhotosClick(e, "allPhotos")}
          className={activeLink === "allPhotos" ? "active" : ""}
        >
          Your Photos
        </a>

        <a
          href="#albums"
          onClick={(e) => handleAlbumsClick(e, "albums")}
          className={activeLink === "albums" ? "active" : ""}
        >
          Albums
        </a>
      </nav>
      <div className="photos-link-page">{toggleAlbums && <Albums />}</div>
      <div className="photos-link-page">{togglePhotos && <Photos />}</div>
    </div>
  )
}

export default PhotosPage
