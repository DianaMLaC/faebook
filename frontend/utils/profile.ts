import axios, { AxiosResponse } from "axios"
import { customHeaders, checkResponse } from "./authentication"
import { User, Photo, Album, Friendship, FriendshipData, Intro } from "./types"

export async function fileChecksum(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const digest = await crypto.subtle.digest("SHA-256", buffer)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export const fetchUserProfile = async (userId: number): Promise<User> => {
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

export const fetchAlbums = async (userID: number): Promise<Album[]> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userID}/albums`)
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get Albums api:", err.message)
    throw err
  }
}

export const fetchUserPhotos = async (userId: number): Promise<Photo[]> => {
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

export const createIntro = async (userID: number, intro: Intro): Promise<Intro> => {
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

export const fetchUserSuggestions = async (searchTerm: string): Promise<User[]> => {
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

export const requestFriendship = async (userId: number): Promise<Friendship> => {
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

export const deleteFriendship = async (friendshipId: number): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/friendships/${friendshipId}`, {
      headers: customHeaders,
    })
    await checkResponse(response)
  } catch (err) {
    console.error("Error in deleting friendship api", err)
    throw err
  }
}

export const updateFriendship = async (friendshipId: number): Promise<Friendship> => {
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

export const fetchFriendships = async (profileId: number): Promise<FriendshipData> => {
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
