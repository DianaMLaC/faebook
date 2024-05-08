import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import Photo from "../photos/photo"
import { fetchUserPhotos } from "../../utils/profile"

const Photos = () => {
  const { currentUser } = useAuth()
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    if (!currentUser?.id) {
      console.log("no current user id")
      return
    }

    async function fetchAllPhotosUrls() {
      const photosData = await fetchUserPhotos(currentUser.id)
      const displayPhotos = photosData.length > 9 ? photosData.slice(0, 9) : photosData
      setPhotos(displayPhotos)
    }

    fetchAllPhotosUrls()
  }, [currentUser])

  return (
    <div className="photos-container">
      <header className="photos-header">
        <h4>Photos</h4>
        <div className="see-photos">See all photos</div>
      </header>
      <ul className="photos-display-grid">
        {photos && photos.map((photo) => <Photo key={photo.id} photo={photo} />)}
      </ul>
    </div>
  )
}

export default Photos
