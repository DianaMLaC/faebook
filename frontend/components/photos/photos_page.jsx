import React from "react"
import { useAuth } from "../../context/auth"
import Albums from "./albums"

const PhotosPage = () => {
  const { currentUser } = useAuth()

  return (
    <div className="photos-container">
      <header className="photos-header">
        <div>
          <h3>Photos</h3>
        </div>
        <div>
          <button>{/* photo uploader and input for hidden from timeline*/}Add photos/video</button>
          <div className="photo-header-more-button">
            {/* the more image and a pop-up See photos hidden from timeline*/}
          </div>
        </div>
      </header>
      <nav className="photos-nav">
        <a href="#tagged-photos">Photos of You</a>
        <a href="#user-uploaded-photos-all">Your Photos</a>

        <a href="#albums">Albums</a>
      </nav>
      <div className="photos-link-page">
        <Albums />
      </div>
    </div>
  )
}

export default PhotosPage
