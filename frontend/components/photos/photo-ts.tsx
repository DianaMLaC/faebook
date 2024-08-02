import React from "react"
import { useNavigate } from "react-router-dom"
import { Photo } from "../../utils/types"

interface PhotoSmallProps {
  photo: Photo
  className: string
}

function PhotoSmall({ photo, className }: PhotoSmallProps): React.ReactElement {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/photo/${photo.id}`)
  }
  // console.log({ photo })
  return (
    <div className={`photo-container-${className}`} onClick={handleClick}>
      {photo.url ? (
        <img className="photo-cover-image" src={photo.url} alt={photo.description} />
      ) : (
        <div>No url to show</div>
      )}
    </div>
  )
}

export default PhotoSmall
