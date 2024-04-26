import React, { useEffect, useState } from "react"
import { uploadProfilePhoto } from "../../utils/profile"
import { CircleLoader } from "react-spinners"

const PhotoUpload = ({ updatePhoto, closeModalContainer, albumName }) => {
  const [photoFile, setPhotoFile] = useState(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0])
  }

  const handleUpload = async () => {
    setIsUploading(true)
    if (!photoFile) {
      console.error("No file selected for upload.")
      return
    }

    const formData = new FormData()
    console.log("photo[image]:", photoFile)
    console.log("photo[description]:", description)
    console.log("photo[album_name]:", albumName)

    formData.append("photo[image]", photoFile)
    formData.append("photo[description]", description)
    formData.append("photo[album_name]", albumName)

    const fileData = await uploadProfilePhoto(formData)
    console.log("PhotoData returned as fileData")
    console.log("fileData:", fileData)
    updatePhoto(fileData.albumName, fileData.url)
    console.log("Data has been sent to parent with updatePhoto callback")
    closeModalContainer()
    setIsUploading(false)
  }

  return (
    <div className="photo-uploader">
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div className="spinner">{isUploading && <CircleLoader loading={isUploading} />}</div>
    </div>
  )
}

export default PhotoUpload
