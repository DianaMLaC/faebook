import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import Album from "./album"
import { fetchAlbums } from "../../utils/profile"

const Albums = () => {
  const { profileUser } = useAuth()
  const [albums, setAlbums] = useState(null)

  useEffect(() => {
    if (profileUser.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchAlbumsData() {
      const albumsData = await fetchAlbums(profileUser.id)
      // console.log("albumsData:", { albumsData })
      setAlbums(albumsData)
      // console.log("albums-state:", albums)
    }

    fetchAlbumsData()
  }, [profileUser, setAlbums])

  return (
    <ul className="albums-list">
      <li className="album-cover">
        <div className="album-cover-photo-create"></div>
        <div className="album-cover-title">Create Album</div>
        <div></div>
      </li>
      {albums && albums.map((album) => <Album key={album.id} album={album} />)}
    </ul>
  )
}

export default Albums
