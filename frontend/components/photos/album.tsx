import React from "react"

function AlbumContainer({ album }): React.ReactElement {
  // console.log("album:", album)
  return (
    <div className="album-cover">
      <div>
        {/* here a link to the photos of the album */}
        <img className="album-cover-photo" src={album.coverPhotoUrl} alt={album.name} />
      </div>

      {/* <div className="more-button-disabled">...</div> */}

      <div className="album-cover-title">{album.name}</div>
      <div className="album-cover-items-number">{album.photosCount} items</div>
    </div>
    // <div> This is the album container</div>
  )
}

export default AlbumContainer
