import axios, { AxiosResponse } from "axios"
import { customHeaders, checkResponse } from "./axios"
import { Post, Like, Comment, Url } from "./types"

interface PostPayload {
  body: string
  content_id?: string
  content_type?: string
}

interface UrlPayload {
  title: string
  description: string
  image: string
  url: string
}

// const LINK_PREVIEW_API_KEY = "9ed80b03c174426ecaab34e1ad344ad8"

// json object returned from get_api_key: {link_preview_api_key: "9ed80b03c174426ecaab34e1ad344ad8"}

// const linkPreviewHeaders = {
//   "X-Linkpreview-Api-Key": LINK_PREVIEW_API_KEY,
// }

const fetchApiKey = async (): Promise<string> => {
  try {
    const response = await axios.get("/api/post_urls/get_api_key")
    return response.data.link_preview_api_key
  } catch (error) {
    console.error("Error fetching LinkPreview API key:", error)
    throw error
  }
}

export const postUrl = async (url: string): Promise<Url> => {
  try {
    const LINK_PREVIEW_API_KEY = await fetchApiKey()
    const encodedUrl = encodeURIComponent(url)
    const linkPreviewResponse = await axios.get(
      `https://api.linkpreview.net/?key=${LINK_PREVIEW_API_KEY}&q=${encodedUrl}`
    )
    await checkResponse(linkPreviewResponse)
    console.log(linkPreviewResponse.data)
    // return linkPreviewResponse.data
    const urlPayload: UrlPayload = {
      title: linkPreviewResponse.data.title,
      description: linkPreviewResponse.data.description,
      image: linkPreviewResponse.data.image,
      url: linkPreviewResponse.data.url,
    }
    const urlResponse = await axios.post("http://localhost:3000/api/post_urls", urlPayload, {
      headers: customHeaders,
    })
    await checkResponse(urlResponse)
    console.log(urlResponse.data)
    return urlResponse.data
  } catch (err) {
    console.error("Error with response from LinkPreview API", err.message)
    throw err
  }
}

export const fetchUrl = async (postId: string, urlId: string): Promise<Url> => {
  try {
    const urlResponse = await axios.get(
      `http://localhost:3000/api/posts/${postId}/post_urls/${urlId}`,
      {
        headers: customHeaders,
      }
    )
    await checkResponse(urlResponse)
    return urlResponse.data
  } catch (err) {
    console.error("Error with response from fetching post_url API", err.message)
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

export const fetchPosts = async (userId: string): Promise<{ posts: Post[] }> => {
  try {
    const response: AxiosResponse<{ posts: Post[] }> = await axios.get(
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

export const toggleLike = async (likeable: string, likeableId: string): Promise<Like> => {
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

export const createComment = async (
  formData: Partial<Comment>,
  itemId: string,
  itemType: "post" | "photo"
): Promise<Comment> => {
  try {
    const endpoint =
      itemType === "post"
        ? `http://localhost:3000/api/posts/${itemId}/comments`
        : `http://localhost:3000/api/photos/${itemId}/comments`

    const response: AxiosResponse<Comment> = await axios.post(endpoint, formData, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in create a comment api:", err.message)
    throw err
  }
}

export const fetchTopLevelComments = async (
  itemId: string,
  itemType: "post" | "photo"
): Promise<{ comments: Comment[] }> => {
  try {
    const endpoint =
      itemType === "post"
        ? `http://localhost:3000/api/posts/${itemId}/comments`
        : `http://localhost:3000/api/photos/${itemId}/comments`

    const response: AxiosResponse<{ comments: Comment[] }> = await axios.get(endpoint, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error in get top level comments api:", err.message)
    throw err
  }
}

// export const fetchPhotoComments = async (photoId: string): Promise<{ comments: Comment[] }> => {
//   try {
//     const response: AxiosResponse<{ comments: Comment[] }> = await axios.get(
//       `http://localhost:3000/api/photos/${photoId}/comments`,
//       {
//         headers: customHeaders,
//       }
//     )
//     await checkResponse(response)
//     return response.data
//   } catch (err) {
//     console.error("Error in get photo comments api:", err.message)
//     throw err
//   }
// }
