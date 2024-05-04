import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchUserPhotos } from "../../utils/profile"
import Photo from "./photo"

const Photos = () => {
  const { currentUser } = useAuth()
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    if (currentUser.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchAllPhotosUrls() {
      const photosData = await fetchUserPhotos(currentUser.id)
      console.log("photos-urls:", { photosData })
      setPhotos(photosData)
    }

    fetchAllPhotosUrls()
  }, [currentUser, setPhotos])

  return (
    <ul className="photos-list">
      {photos && photos.map((photo) => <Photo key={photo.id} photo={photo} />)}
    </ul>
  )
}

export default Photos
