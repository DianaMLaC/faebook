import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import Albums from "./albums"
import PhotoUpload from "../profile/photo_uploader"

const PhotosPage = () => {
  const [toggle, setToggle] = useState(false)
  const [activeLink, setActiveLink] = useState(null)

  const handleClick = (e, link) => {
    e.preventDefault()
    setToggle(true)
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
        <a href="#user-uploaded-photos-all">Your Photos</a>

        <a
          href="#albums"
          onClick={(e) => handleClick(e, "albums")}
          className={activeLink === "albums" ? "active" : ""}
        >
          Albums
        </a>
      </nav>
      <div className="photos-link-page">{toggle && <Albums />}</div>
    </div>
  )
}

export default PhotosPage
