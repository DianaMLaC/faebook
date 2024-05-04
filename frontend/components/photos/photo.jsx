import React from "react"

const Photo = ({ photo }) => {
  return (
    <div className="photo-container">
      {photo.url ? (
        <img className="photo-cover-image" src={photo.url} alt={photo.description} />
      ) : (
        <div>No url to show</div>
      )}
    </div>
  )
}

export default Photo
