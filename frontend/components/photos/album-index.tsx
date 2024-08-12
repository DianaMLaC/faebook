import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import AlbumContainer from "./album"
import { fetchAlbums } from "../../utils/axios"
import { Album } from "../../utils/types"

function Albums(): React.ReactElement {
  const { profileUser } = useAuth()
  const [albums, setAlbums] = useState<Album[] | null>(null)

  useEffect(() => {
    if (profileUser?.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchAlbumsData() {
      if (profileUser) {
        const albumsData = await fetchAlbums(profileUser.id)
        setAlbums(albumsData)
      }
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
      {albums &&
        albums.map(
          (album: Album): React.ReactElement => <AlbumContainer key={album.id} album={album} />
        )}
    </ul>
  )
}

export default Albums
