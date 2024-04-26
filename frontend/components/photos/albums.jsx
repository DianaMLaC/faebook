import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import Album from "./album"
import { fetchAlbums } from "../../utils/profile"

const Albums = () => {
  const { currentUser } = useAuth()
  const [albums, setAlbums] = useState(null)

  useEffect(() => {
    if (currentUser.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchAlbumsData() {
      const albumsData = await fetchAlbums(currentUser.id)
      console.log("albumsData:", { albumsData })
      setAlbums(albumsData)
      console.log("albums-state:", albums)
    }

    fetchAlbumsData()
  }, [currentUser, setAlbums])

  return (
    <ul className="albums-list">
      <li className="album-cover">
        <div className="album-cover-photo-create"></div>
        <div>AlbumForm</div>
        <div></div>
      </li>
      {albums && albums.map((album) => <Album key={album.id} album={album} />)}
    </ul>
  )
}

export default Albums
