import React, { useEffect, useState } from "react"
import { uploadProfilePhoto } from "../../utils/profile"
import { CircleLoader } from "react-spinners"

function PhotoUpload({ updatePhoto, closeModalContainer, albumName }): React.ReactElement {
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

    const formData = new FormData()
    console.log("photo[image]:", photoFile)
    console.log("photo[description]:", description)
    // console.log("photo[album_name]:", albumName)

    formData.append("photo[image]", photoFile)
    formData.append("photo[description]", description)
    // formData.append("photo[album_name]", albumName)
    formData.append("album_name", albumName)

    try {
      const fileData = await uploadProfilePhoto(formData)
      console.log("PhotoData returned as fileData")
      console.log("fileData:", fileData)
      updatePhoto(fileData.albumName, fileData.url)
      console.log("Data has been sent to parent with updatePhoto callback")
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
