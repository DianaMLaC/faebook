import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchUserPhotos } from "../../utils/profile"
import PhotoSmall from "./photo-ts"
import { Photo } from "../../utils/types"

function PhotosIndex(): React.ReactElement {
  const { profileUser } = useAuth()
  const [photos, setPhotos] = useState<Photo[] | null>(null)

  useEffect(() => {
    if (profileUser?.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchAllPhotosUrls() {
      if (profileUser) {
        const photosData = await fetchUserPhotos(profileUser.id)
        photosData.length > 0 ? setPhotos(photosData) : setPhotos(null)
      }
      // console.log("photos-urls:", photosData)
      // console.log(photosData.length)
    }

    fetchAllPhotosUrls()
  }, [profileUser, setPhotos])

  return (
    <ul className="photos-list">
      {photos &&
        photos.map((photo: Photo): React.ReactNode => <PhotoSmall key={photo.id} photo={photo} />)}
    </ul>
  )
}

export default PhotosIndex
