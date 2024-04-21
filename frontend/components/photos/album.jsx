import React from "react"

const Album = ({ album }) => {
  return (
    <div className="album-cover">
      <div className="album-cover-photo">{/* here a link to the photos of the album */}</div>

      <div className="more-button-disabled">...</div>

      <div className="album-cover-title">{album.name}</div>
      <div className="album-cover-items-number">{album.photos.length}</div>
    </div>
  )
}

export default Album
