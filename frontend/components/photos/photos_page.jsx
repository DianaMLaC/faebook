import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import Albums from "./albums"
import { fetchAlbums, uploadProfilePhoto } from "../../utils/profile"

const PhotosPage = () => {
  const { currentUser } = useAuth()
  const [albums, setAlbums] = useState(null)

  const showAlbums = async (e) => {
    e.preventDefault()
    const albumsData = await fetchAlbums(currentUser.id)
    setAlbums(albumsData)
    console.log("albumsData:", albumsData)
  }
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

        <a href="#albums" onClick={showAlbums}>
          Albums
        </a>
      </nav>
      <div className="photos-link-page">{/* <Albums albums={albums} /> */}</div>
    </div>
  )
}

export default PhotosPage
