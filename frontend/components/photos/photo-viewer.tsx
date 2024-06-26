import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { HiOutlineZoomOut, HiOutlineZoomIn } from "react-icons/hi"
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs"
import { FaTag } from "react-icons/fa6"
import { useAuth } from "../../context/auth"
import { Comment, Like, Photo } from "../../utils/types"
import { fetchAlbum, fetchPhoto } from "../../utils/profile"

function PhotoViewer(): React.ReactElement {
  const { profileUser } = useAuth()
  const { photoId } = useParams<{ photoId: string }>()
  const [photoDetails, setPhotoDetails] = useState<Photo | null>(null)
  const [photoLikes, setPhotoLikes] = useState<Like[] | null>(null)
  // const [photoComments, setPhotoComments] = useState<Comment[] | null>(null)
  const [albumPhotos, setAlbumPhotos] = useState<Photo[] | []>([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadPhotoDetails = async () => {
      if (profileUser && photoId) {
        const details = await fetchPhoto(profileUser.id, photoId)
        setPhotoDetails(details)
        setPhotoLikes(details.likes)
        // setPhotoComments(details.Comments)
        const album = await fetchAlbum(profileUser.id, details.albumId)
        console.log({ album })
        setAlbumPhotos(album.photos)
      }
    }

    loadPhotoDetails()
  }, [photoId])

  const handleNextPhoto = () => {
    const currentIndex = albumPhotos.findIndex((photo) => photo.id === photoId)
    if (currentIndex > 0) {
      navigate(`/photo/${albumPhotos[currentIndex - 1].id}`)
    }
  }

  const handlePrevPhoto = () => {
    const currentIndex = albumPhotos.findIndex((photo) => photo.id === photoId)
    console.log("currentIndex:", currentIndex)
    if (currentIndex < albumPhotos.length - 1) {
      navigate(`/photo/${albumPhotos[currentIndex + 1].id}`)
    }
  }

  if (!photoDetails) {
    return <div>Loading photo...</div>
  }

  const currentIndex = albumPhotos.findIndex((photo) => photo.id === photoId)
  const isPrevDisabled = currentIndex >= albumPhotos.length - 1
  const isNextDisabled = currentIndex <= 0

  return (
    <div className="photo-viewer-modal">
      <div className="photo-viewer-content">
        <div className="photo-viewer-main">
          <div className="main-header">
            <div className="main-header-left">
              <div className="close-button" onClick={() => navigate(-1)}>
                <IoClose />
              </div>
              <img
                className="photo-viewer-logo-img"
                src="/assets/images/dark-logo.png"
                alt="Faebook"
              />
            </div>
            <div className="main-header-right">
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
          <div className="details-header">Nav right menu here</div>
          <div className="photo-details">
            <p>{photoDetails.description}</p>
            {/* <div className="comments-section">
                {photoDetails.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>
                      <strong>{comment.user}</strong>: {comment.text}
                    </p>
                  </div>
                ))}
              </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoViewer
