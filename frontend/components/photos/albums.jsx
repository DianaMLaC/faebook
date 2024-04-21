import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import Album from "./album"

const Albums = () => {
  const { currentUser } = useAuth()
  const [albums, setAlbums] = useState(null)

  return (
    <ul className="albums-list">
      <li className="albums-list-first">
        <div className="album-cover-photo-create"></div>
        <div>AlbumForm</div>
        <div></div>
      </li>
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </ul>
  )
}

export default Albums
