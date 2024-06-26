import React from "react"
import { useNavigate } from "react-router-dom"
import ReactModal from "react-modal"

function PhotoSmall({ photo }): React.ReactElement {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/photo/${photo.id}`)
  }
  // console.log({ photo })
  return (
    <div className="photo-container" onClick={handleClick}>
      {photo.url ? (
        <img className="photo-cover-image" src={photo.url} alt={photo.description} />
      ) : (
        <div>No url to show</div>
      )}
    </div>
  )
}

export default PhotoSmall
