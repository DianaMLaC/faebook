import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchUserPhotos } from "../../utils/profile"

const Photos = () => {
  const { currentUser } = useAuth()
  const [photosUrls, setPhotosUrls] = useState(null)

  useEffect(() => {
    if (currentUser.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchAllPhotosUrls() {
      const photosData = await fetchUserPhotos(currentUser.id)
      console.log("photos-urls:", { photosData })
      setPhotosUrls(photosData)
    }

    fetchAllPhotosUrls()
  }, [currentUser, setPhotosUrls])

  return (
    <div>
      <div> Photos</div>
    </div>
  )
}

export default Photos
