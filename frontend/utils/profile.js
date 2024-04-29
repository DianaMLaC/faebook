import { customHeaders } from "./authentication"
import { checkResponse } from "./authentication"

async function fileChecksum(file) {
  const buffer = await file.arrayBuffer()
  const digest = await crypto.subtle.digest("SHA-256", buffer)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "POST",
      headers: customHeaders,
    })
    await checkResponse(response)
    const profile = await response.json()
    return profile
  } catch (err) {
    console.error(err.message)
    console.error("Error with response code or parsing response in API GET User", err)
    throw err
  }
}

export const uploadProfilePhoto = async (formData) => {
  try {
    const response = await fetch("http://localhost:3000/api/photos", {
      method: "POST",
      body: formData,
    })
    await checkResponse(response)
    const photoData = await response.json()
    console.log("LOG: API POST 'api/photos/")
    return photoData
  } catch (err) {
    console.error("Error in uploadProfilePhoto api:", err.message)
    throw err
  }
}

export const fetchAlbums = async (userID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userID}/albums`, {
      method: "GET",
    })
    await checkResponse(response)
    const photoData = await response.json()
    console.log("LOG: API GET 'api/users/user_id/albums")
    return photoData
  } catch (err) {
    console.error("Error in get Albums api:", err.message)
    throw err
  }
}

export const fetchUserPhotos = async (userID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userID}/photos`, {
      method: "GET",
      headers: customHeaders,
    })
    await checkResponse(response)
    const photoData = await response.json()
    console.log("LOG: API GET 'api/users/user_id/albums")
    return photoData
  } catch (err) {
    console.error("Error in get Photos api:", err.message)
    throw err
  }
}
