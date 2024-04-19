import React, { useEffect, useState } from "react"
import { uploadProfilePhoto } from "../../utils/profile"

const ProfilePhotoUpload = ({ updateProfilePhoto }) => {
  const [photoFile, setPhotoFile] = useState(null)
  // const [description, setDescription] = useState("")

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!photoFile) {
      console.error("No file selected for upload.")
      return
    }

    const formData = new FormData()
    formData.append("photo[image]", photoFile)
    console.log("formData:", formData)

    const fileData = await uploadProfilePhoto(formData)
    console.log("PhotoData returned as fileData")
    console.log("fileData:", fileData)
    updateProfilePhoto(fileData.url)
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ProfilePhotoUpload
