import React from "react"
import { useNavigate } from "react-router-dom"
import { Photo } from "../../utils/types"

function PhotoSmall({
  photo,
  className,
}: {
  photo: Photo
  className?: string
}): React.ReactElement {
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
