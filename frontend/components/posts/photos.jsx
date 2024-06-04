import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import Photo from "../photos/photo"
import { fetchUserPhotos } from "../../utils/profile"

const Photos = () => {
  const { profileUser } = useAuth()
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    if (!profileUser.id) {
      console.log("no current user id")
      return
    }

    async function fetchAllPhotosUrls() {
      const photosData = await fetchUserPhotos(profileUser.id)
      const displayPhotos = photosData.length > 9 ? photosData.slice(0, 9) : photosData
      setPhotos(displayPhotos.length > 0 ? displayPhotos : null)
    }

    fetchAllPhotosUrls()
  }, [profileUser])

  return (
    <div className="photos-container">
      <header className="photos-header">
        <h4>Photos</h4>
        <div className="see-photos">See All Photos</div>
      </header>
      <ul className="photos-display-grid">
        {photos && photos.map((photo) => <Photo key={photo.id} photo={photo} />)}
      </ul>
    </div>
  )
}

export default Photos
