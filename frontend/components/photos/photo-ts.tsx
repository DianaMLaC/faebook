import React from "react"
import { Photo } from "../../utils/types"

function PhotoSmall({ photo }): React.ReactElement {
  // console.log({ photo })
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

export default PhotoSmall
