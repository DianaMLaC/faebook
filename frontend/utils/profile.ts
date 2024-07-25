import axios, { AxiosResponse } from "axios"
import { customHeaders, checkResponse } from "./authentication"
import { User, Photo, Album, FriendshipFriend, FriendshipData, Intro } from "./types"

export async function fileChecksum(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const digest = await crypto.subtle.digest("SHA-256", buffer)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export const fetchUserProfile = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userId}`, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error with response code or parsing response in API GET User", err)
    throw err
  }
}

export const uploadProfilePhoto = async (formData: FormData): Promise<Photo> => {
  try {
    const response = await axios.post("http://localhost:3000/api/photos", formData)
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in uploadProfilePhoto api:", err.message)
    throw err
  }
}

export const fetchAlbums = async (userID: string): Promise<Album[]> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userID}/albums`)
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get Albums api:", err.message)
    throw err
  }
}

export const fetchAlbum = async (userID: string, albumId: string): Promise<Album> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userID}/albums/${albumId}`)
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get Albums api:", err.message)
    throw err
  }
}

export const fetchUserPhotos = async (userId: string): Promise<Photo[]> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userId}/photos`, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get Photos api:", err.message)
    throw err
  }
}

export const fetchPhoto = async (userId: string, photoId: string): Promise<Photo> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${userId}/photos/${photoId}`,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get Photos api:", err.message)
    throw err
  }
}

export const createIntro = async (userID: string, intro: Intro): Promise<Intro> => {
  try {
    const response = await axios.post(`http://localhost:3000/api/users/${userID}/intros`, intro, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in create Intro api:", err.message)
    throw err
  }
}

export const updateIntro = async (
  userId: string,
  introId: string,
  intro: Intro
): Promise<Intro> => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/users/${userId}/intros/${introId}`,
      intro,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in update Intro api:", err.message)
    throw err
  }
}

export const fetchUserSuggestions = async (searchTerm: string): Promise<{ users: User[] }> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/search?q=${encodeURIComponent(searchTerm)}`,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error fetching user suggestions", err)
    throw err
  }
}

export const requestFriendship = async (userId: string): Promise<FriendshipFriend> => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/users/${userId}/friendships`,
      null,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in requesting friendship api", err)
    throw err
  }
}
export const deleteFriendship = async (friendshipId: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/friendships/${friendshipId}`, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return true
  } catch (err) {
    console.error("Error in deleting friendship api", err)
    return false
  }
}

export const updateFriendship = async (friendshipId: string): Promise<FriendshipFriend> => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/friendships/${friendshipId}/accept`,
      null,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in accepting friendship api", err)
    throw err
  }
}

export const fetchFriendships = async (profileId: string): Promise<FriendshipData> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${profileId}/friendships`, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in fetching friendships api", err)
    throw err
  }
}
