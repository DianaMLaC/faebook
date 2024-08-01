import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import PhotoSmall from "../photos/photo-ts"
import { fetchUserPhotos } from "../../utils/profile"
import { Photo } from "../../utils/types"
import { useNavigate } from "react-router-dom"

function Photos(): React.ReactElement {
  const { profileUser } = useAuth()
  const [photos, setPhotos] = useState<Photo[] | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchAllPhotosUrls() {
      if (profileUser) {
        const photosData = await fetchUserPhotos(profileUser.id)
        console.log("photos of profileUser")
        const displayPhotos = photosData.length > 9 ? photosData.slice(0, 9) : photosData
        setPhotos(displayPhotos.length > 0 ? displayPhotos : null)
      }
    }

    fetchAllPhotosUrls()
  }, [profileUser])

  const handleSeeAllPhotosClick = () => {
    if (profileUser) {
      navigate(`/profile-page/${profileUser.id}/photos`)
    }
  }
  return (
    <div className="photos-container">
      <header className="photos-header">
        <h2>Photos</h2>
        <div className="see-photos" onClick={handleSeeAllPhotosClick}>
          See All Photos
        </div>
      </header>
      <ul className="photos-display-grid">
        {photos &&
          photos.map((photo) => (
            <PhotoSmall key={photo.id} photo={photo} className="posts-photos" />
          ))}
      </ul>
    </div>
  )
}

export default Photos
