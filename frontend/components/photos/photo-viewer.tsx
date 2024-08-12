import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { HiOutlineZoomOut, HiOutlineZoomIn } from "react-icons/hi"
import { BsArrowsAngleExpand } from "react-icons/bs"
import { RiDeleteBinLine } from "react-icons/ri"
import { FaTag } from "react-icons/fa6"
import { useAuth } from "../../context/auth"
import { Photo } from "../../utils/types"
import { deletePhoto, fetchAlbum, fetchPhoto } from "../../utils/axios"
import PhotoDetails from "./photo-details"
import PhotosProvider from "../../context/photos"

function PhotoViewer(): React.ReactElement {
  const { profileUser, currentUser } = useAuth()
  const { photoId } = useParams<{ photoId: string }>()
  const [photoDetails, setPhotoDetails] = useState<Photo | null>(null)
  const [albumPhotos, setAlbumPhotos] = useState<Photo[] | []>([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadPhotoDetails = async () => {
      if (profileUser && photoId) {
        const details = await fetchPhoto(profileUser.id, photoId)
        setPhotoDetails(details)
        const album = await fetchAlbum(profileUser.id, details.albumId)
        setAlbumPhotos(album.photos)
      }
    }

    loadPhotoDetails()
  }, [photoId])

  const handleNextPhoto = () => {
    const currentIndex = albumPhotos.findIndex((photo) => photo.id === photoId)
    if (currentIndex < albumPhotos.length - 1) {
      navigate(`/photo/${albumPhotos[currentIndex + 1].id}`)
    }
  }

  const handlePrevPhoto = () => {
    const currentIndex = albumPhotos.findIndex((photo) => photo.id === photoId)
    if (currentIndex > 0) {
      navigate(`/photo/${albumPhotos[currentIndex - 1].id}`)
    }
  }

  const handlePhotoDelete = async () => {
    const deleteResponse = await deletePhoto(photoId!)
    if (deleteResponse) {
      navigate(`/photo/${albumPhotos[currentIndex - 1].id}`)
    }
  }

  if (!photoDetails) {
    return <div>Loading photo...</div>
  }

  const currentIndex = albumPhotos.findIndex((photo) => photo.id === photoId)
  const isPrevDisabled = currentIndex <= 0
  const isNextDisabled = currentIndex >= albumPhotos.length - 1

  return (
    <div className="photo-viewer-modal">
      <div className="photo-viewer-content">
        <div className="photo-viewer-main">
          <div className="main-header">
            <div className="main-header-left">
              <div
                className="close-button"
                onClick={() => navigate(`/profile-page/${profileUser?.id}/posts`)}
              >
                <IoClose />
              </div>
            </div>
            <div className="main-header-right">
              {currentUser?.id === profileUser?.id && (
                <RiDeleteBinLine className="delete-photo-button" onClick={handlePhotoDelete} />
              )}
              <HiOutlineZoomIn />
              <HiOutlineZoomOut />
              <FaTag />
              <BsArrowsAngleExpand />
            </div>
          </div>
          <div className="photo-viewer-display">
            <button
              className="nav-arrow left-arrow"
              onClick={handlePrevPhoto}
              disabled={isPrevDisabled}
            >
              <IoMdArrowRoundBack />
            </button>
            <img src={photoDetails.url} alt={photoDetails.description} />
            <button
              className="nav-arrow right-arrow"
              onClick={handleNextPhoto}
              disabled={isNextDisabled}
            >
              <IoMdArrowRoundForward />
            </button>
          </div>
        </div>
        <div className="photo-viewer-details">
          <PhotosProvider>
            <PhotoDetails photo={photoDetails} />
          </PhotosProvider>
        </div>
      </div>
    </div>
  )
}

export default PhotoViewer
