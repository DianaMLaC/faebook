import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchUserPhotos } from "../../utils/profile"
import Photo from "./photo"

const PhotosIndex = () => {
  const { profileUser } = useAuth()
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    if (profileUser.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchAllPhotosUrls() {
      const photosData = await fetchUserPhotos(profileUser.id)
      console.log("photos-urls:", photosData)
      console.log(photosData.length)
      photosData.length > 0 ? setPhotos(photosData) : setPhotos(null)
    }

    fetchAllPhotosUrls()
  }, [profileUser, setPhotos])

  return (
    <ul className="photos-list">
      {photos && photos.map((photo) => <Photo key={photo.id} photo={photo} />)}
    </ul>
  )
}

export default PhotosIndex
