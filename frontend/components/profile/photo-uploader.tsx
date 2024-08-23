import React, { useEffect, useState } from "react"
import { uploadPhoto } from "../../utils/axios"
import { CircleLoader } from "react-spinners"
import { useAuth } from "../../context/auth"

function PhotoUpload({ updatePhoto, closeModalContainer, albumName }): React.ReactElement {
  const { currentUser, setCurrentUser } = useAuth()
  const [photoFile, setPhotoFile] = useState(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const title = "Choose " + albumName + " Picture"

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!photoFile) {
      console.error("No file selected for upload.")
      return
    }

    setIsUploading(true)
    console.log({ photoFile })

    const formData = new FormData()
    formData.append("photo[image]", photoFile)
    formData.append("photo[description]", description)
    formData.append("album_name", albumName)
    console.log({ formData })

    try {
      const fileData = await uploadPhoto(formData)
      updatePhoto(fileData.albumName, fileData.url)

      if (currentUser) {
        let newUserData = { ...currentUser }
        if (albumName === "Profile") {
          newUserData.profilePhotoUrl = fileData.url
        } else if (albumName === "Cover") {
          newUserData.coverPhotoUrl = fileData.url
        }
        setCurrentUser(newUserData)
        sessionStorage.setItem("currentUser", JSON.stringify(newUserData))
      }

      closeModalContainer()
      setIsUploading(false)
    } catch (error) {
      console.error("Error uploading photo:", error)
    }
  }

  return (
    <div className="photo-uploader">
      <header>
        <h2>{title}</h2>
      </header>
      <section>
        <input
          type="text"
          placeholder="Caption this photo"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!photoFile}>
          Upload
        </button>
        <div className="spinner">{isUploading && <CircleLoader loading={isUploading} />}</div>
      </section>
    </div>
  )
}

export default PhotoUpload
