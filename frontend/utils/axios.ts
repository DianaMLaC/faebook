import axios, { AxiosError, AxiosResponse } from "axios"
import {
  User,
  NewUserData,
  SessionData,
  BackendErrorResponse,
  Photo,
  Url,
  UrlPayload,
  PostPayload,
  Post,
  Like,
  Comment,
  Intro,
  Album,
  FriendshipFriend,
  FriendshipData,
  Chat,
  Message,
} from "./types"

// Determine the base URL based on the environment
export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://faebook.fly.dev/api" // Production URL
    : "http://localhost:3000/api" // Development URL

// Handle CSRF token
const getCsrfToken = (): string | undefined => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || undefined
}

// Customize headers
export const customHeaders = {
  "Content-Type": "application/json;charset=UTF-8",
  "X-CSRF-Token": getCsrfToken(),
}
console.log("Axios Base URL:", baseURL)
// Axios instance with dynamic baseURL
export const apiClient = axios.create({
  baseURL: baseURL,
  headers: customHeaders,
  withCredentials: true,
})

// apiClient.interceptors.request.use((config) => {
//   console.log("Axios Request Headers:", config.headers)
//   return config
// })

// This function extracts and formats error messages from Axios errors
export function extractErrorMessage(error: AxiosError<BackendErrorResponse>): string {
  const errors = error.response?.data?.errors
  if (errors) {
    return Object.values(errors).flat().join("\n")
  }
  return "An unknown error occurred. Please try again."
}

// Check response to be taken out after all api refactor
export async function checkResponse(response: AxiosResponse) {
  if (response.status < 200 || response.status >= 300) {
    const backendErrorResponse: BackendErrorResponse = response.data

    if (backendErrorResponse && backendErrorResponse.errors) {
      const errorMessages = Object.values(backendErrorResponse.errors).flat().join("\n")
      throw new Error(errorMessages)
    } else {
      throw new Error("An error occurred. Please try again.")
    }
  }
  return response
}

// USER AUTH
export const postUser = async (userData: NewUserData) => {
  try {
    const response = await apiClient.post<User>("/users", userData)
    // await checkResponse(response)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in postUser API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in postUser API:", err)
    throw err
  }
}

export const postSession = async (sessionData: SessionData) => {
  try {
    const response = await apiClient.post<User>("/authentications", sessionData)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in postSession API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in postSession API:", err)
    throw err
  }
}

export const deleteSession = async () => {
  try {
    const response = await apiClient.delete("/authentications")
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in deleteSession API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in deleteSession API:", err)
    throw err
  }
}

export const fetchUserProfile = async (userId: string): Promise<User> => {
  try {
    const response = await apiClient.get<User>(`/users/${userId}`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchUserProfile API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchUserProfile API:", err)
    throw err
  }
}

export const fetchUserSuggestions = async (searchTerm: string): Promise<{ users: User[] }> => {
  try {
    const response = await apiClient.get(`/users/search?q=${encodeURIComponent(searchTerm)}`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchUserSuggestions API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchUserSuggestions API:", err)
    throw err
  }
}

// INTRO
export const createIntro = async (userID: string, intro: Intro): Promise<Intro> => {
  try {
    const response: AxiosResponse<Intro> = await apiClient.post(`/users/${userID}/intros`, intro)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in createIntro API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in createIntro API:", err)
    throw err
  }
}

export const updateIntro = async (
  userId: string,
  introId: string,
  intro: Intro
): Promise<Intro> => {
  try {
    const response: AxiosResponse<Intro> = await apiClient.patch(
      `/users/${userId}/intros/${introId}`,
      intro
    )
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in updateIntro API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in updateIntro API:", err)
    throw err
  }
}

// POSTS
const fetchApiKey = async (): Promise<string> => {
  try {
    const response = await apiClient.get("/post_urls/get_api_key")
    return response.data.link_preview_api_key
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchApiKey API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchApiKey API:", err)
    throw err
  }
}

export const postUrl = async (url: string): Promise<Url> => {
  try {
    const LINK_PREVIEW_API_KEY = await fetchApiKey()
    const encodedUrl = encodeURIComponent(url)
    const linkPreviewResponse = await axios.get(
      `https://api.linkpreview.net/?key=${LINK_PREVIEW_API_KEY}&q=${encodedUrl}`
    )

    const urlPayload: UrlPayload = {
      title: linkPreviewResponse.data.title,
      description: linkPreviewResponse.data.description,
      image: linkPreviewResponse.data.image,
      url: linkPreviewResponse.data.url,
    }
    console.log({ urlPayload })

    const urlResponse: AxiosResponse<Url> = await apiClient.post("/post_urls", urlPayload)
    return urlResponse.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in postUrl API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in postUrl API:", err)
    throw err
  }
}

export const fetchUrl = async (postId: string, urlId: string): Promise<Url> => {
  try {
    const urlResponse: AxiosResponse<Url> = await apiClient.get(
      `/posts/${postId}/post_urls/${urlId}`
    )
    return urlResponse.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchUrl API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchUrl API:", err)
    throw err
  }
}

export const createPost = async (
  postBody: string,
  profileId: string,
  contentId?: string,
  contentType?: string
): Promise<Post> => {
  try {
    const payload: PostPayload = {
      body: postBody,
      content_id: contentId,
      content_type: contentType,
    }
    const response: AxiosResponse<Post> = await apiClient.post(`/users/${profileId}/posts`, payload)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in createPost API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in createPost API:", err)
    throw err
  }
}

export const fetchPosts = async (userId: string): Promise<{ posts: Post[] }> => {
  try {
    const response: AxiosResponse<{ posts: Post[] }> = await apiClient.get(`/users/${userId}/posts`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchPosts API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchPosts API:", err)
    throw err
  }
}

export const destroyPost = async (postId: string) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in deletePost API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in deletePost API:", err)
    throw err
  }
}

// LIKES
export const toggleLike = async (likeable: string, likeableId: string): Promise<Like> => {
  try {
    const response: AxiosResponse<Like> = await apiClient.post(
      `/${likeable}/${likeableId}/likes/toggle_like`
    )
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in toggleLike API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in toggleLike API:", err)
    throw err
  }
}

// COMMENTS
export const createComment = async (
  formData: Partial<Comment>,
  itemId: string,
  itemType: "post" | "photo"
): Promise<Comment> => {
  try {
    const endpoint =
      itemType === "post" ? `/posts/${itemId}/comments` : `/photos/${itemId}/comments`
    const response: AxiosResponse<Comment> = await apiClient.post(endpoint, formData)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in createComment API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in createComment API:", err)
    throw err
  }
}

export const fetchTopLevelComments = async (
  itemId: string,
  itemType: "post" | "photo"
): Promise<{ comments: Comment[] }> => {
  try {
    const endpoint =
      itemType === "post" ? `/posts/${itemId}/comments` : `/photos/${itemId}/comments`

    const response: AxiosResponse<{ comments: Comment[] }> = await apiClient.get(endpoint)

    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchTopLevelComments API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchTopLevelComments API:", err)
    throw err
  }
}

// PHOTOS
export const fetchUserPhotos = async (userId: string): Promise<Photo[]> => {
  try {
    const response: AxiosResponse<Photo[]> = await apiClient.get(`/users/${userId}/photos`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchUserPhotos API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchUserPhotos API:", err)
    throw err
  }
}

export const uploadPhoto = async (formData: FormData): Promise<Photo> => {
  try {
    const csrfToken = getCsrfToken()
    console.log("CSRF Token for uploadPhoto:", csrfToken) // Log CSRF token value

    const response: AxiosResponse<Photo> = await axios.post("/photos", formData, {
      baseURL: apiClient.defaults.baseURL, // Use the same baseURL as apiClient
      headers: {
        "Content-Type": "multipart/form-data", // Set the correct content type for FormData
        "X-CSRF-Token": csrfToken, // Include CSRF token
      },
    })

    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in uploadPhoto API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in uploadPhoto API:", err)
    throw err
  }
}

export const fetchPhoto = async (userId: string, photoId: string): Promise<Photo> => {
  try {
    const response: AxiosResponse<Photo> = await apiClient.get(`/users/${userId}/photos/${photoId}`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchPhoto API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchPhoto API:", err)
    throw err
  }
}

export const editPhoto = async (photoId: string, description: string): Promise<Photo> => {
  try {
    const payload = {
      description,
    }
    const response: AxiosResponse<Photo> = await apiClient.patch(`/photos/${photoId}`, payload)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in editPhoto API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in editPhoto API:", err)
    throw err
  }
}

export const deletePhoto = async (photoId: string) => {
  try {
    const response = await apiClient.delete(`/photos/${photoId}`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in deletePhoto API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in deletePhoto API:", err)
    throw err
  }
}

// ALBUMS
export const fetchAlbums = async (userID: string): Promise<Album[]> => {
  try {
    const response: AxiosResponse<Album[]> = await apiClient.get(`users/${userID}/albums`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchAlbums API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchAlbums API:", err)
    throw err
  }
}

export const fetchAlbum = async (userID: string, albumId: string): Promise<Album> => {
  try {
    const response: AxiosResponse<Album> = await apiClient.get(`/users/${userID}/albums/${albumId}`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchAlbum API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchAlbum API:", err)
    throw err
  }
}

// FRIENDSHIPS
export const requestFriendship = async (userId: string): Promise<FriendshipFriend> => {
  try {
    const response: AxiosResponse<FriendshipFriend> = await apiClient.post(
      `/users/${userId}/friendships`
    )
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in requestFriendship API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in requestFriendship API:", err)
    throw err
  }
}

export const deleteFriendship = async (friendshipId: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/friendships/${friendshipId}`)
    return true
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in deleteFriendship API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in deleteFriendship API:", err)
    return false
  }
}

export const updateFriendship = async (friendshipId: string): Promise<FriendshipFriend> => {
  try {
    const response: AxiosResponse<FriendshipFriend> = await apiClient.patch(
      `/friendships/${friendshipId}/accept`
    )
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in updateFriendship API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in updateFriendship API:", err)
    throw err
  }
}

export const fetchFriendships = async (profileId: string): Promise<FriendshipData> => {
  try {
    const response: AxiosResponse<FriendshipData> = await apiClient.get(
      `/users/${profileId}/friendships`
    )
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchFriendships API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchFriendships API:", err)
    throw err
  }
}

// CHATS

export const initiateChat = async (senderId: string, recipientId: string): Promise<Chat> => {
  try {
    const payload = {
      sender_id: senderId,
      recipient_id: recipientId,
    }
    const response: AxiosResponse<Chat> = await apiClient.post(`/chats/`, payload)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in initiateChat API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in initiateChat API:", err)
    throw err
  }
}

export const createMessage = async (
  chatId: string,
  body: string,
  senderId: string
): Promise<Message> => {
  try {
    const payload = {
      body,
      sender_id: senderId,
    }
    const response: AxiosResponse<Message> = await apiClient.post(
      `/chats/${chatId}/messages`,
      payload
    )
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in createMessage API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in createMessage API:", err)
    throw err
  }
}

export const fetchMessages = async (chatId: string): Promise<Message[]> => {
  try {
    const response: AxiosResponse<Message[]> = await apiClient.get(`/chats/${chatId}/messages`)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = extractErrorMessage(err)
      console.error("Error in fetchMessages API:", errorMessage)
      throw new Error(errorMessage)
    }
    console.error("Non-Axios error in fetchMessages API:", err)
    throw err
  }
}
