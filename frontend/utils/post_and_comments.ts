import axios, { AxiosResponse } from "axios"
import { customHeaders, checkResponse } from "./authentication"
import { Post, Like, Comment } from "./types"

interface PostPayload {
  body: string
}

export const createPost = async (postBody: string, profileId: number): Promise<Post> => {
  try {
    const payload: PostPayload = {
      body: postBody,
    }

    const response: AxiosResponse<Post> = await axios.post(
      `http://localhost:3000/api/users/${profileId}/posts`,
      payload,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in create a Post api:", err.message)
    throw err
  }
}

export const fetchPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response: AxiosResponse<Post[]> = await axios.get(
      `http://localhost:3000/api/users/${userId}/posts`,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get Posts api:", err.message)
    throw err
  }
}

export const toggleLike = async (likeable: string, likeableId: number): Promise<Like> => {
  try {
    const response: AxiosResponse<Like> = await axios.post(
      `http://localhost:3000/api/${likeable}/${likeableId}/likes/toggle_like`,
      null,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in create like api:", err.message)
    throw err
  }
}

export const createComment = async (formData: FormData, postId: string): Promise<Comment> => {
  try {
    const response: AxiosResponse<Comment> = await axios.post(
      `http://localhost:3000/api/posts/${postId}/comments`,
      formData,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in create a Comment api:", err.message)
    throw err
  }
}

export const fetchTopLevelComments = async (postId: string): Promise<Comment[]> => {
  try {
    const response: AxiosResponse<Comment[]> = await axios.get(
      `http://localhost:3000/api/posts/${postId}/comments`,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get top level comments api:", err.message)
    throw err
  }
}
