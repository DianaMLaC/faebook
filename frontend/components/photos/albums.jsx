import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import Album from "./album"

const Albums = ({ albums }) => {
  const { currentUser } = useAuth()

  return (
    <ul className="albums-list">
      <li className="album-cover">
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
