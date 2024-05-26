import { customHeaders } from "./authentication"
import { checkResponse } from "./authentication"

export const createPost = async (postBody, profileId) => {
  try {
    const payload = {
      body: postBody,
    }

    const response = await fetch(`http://localhost:3000/api/users/${profileId}/posts`, {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(payload),
    })
    await checkResponse(response)
    const postData = await response.json()
    // console.log("API create POST response:", postData)
    return postData
  } catch (err) {
    console.error("Error in create a Post api:", err.message)
    throw err
  }
}

export const fetchPosts = async (userID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userID}/posts`, {
      method: "GET",
      headers: customHeaders,
    })
    await checkResponse(response)
    const postsData = await response.json()
    // console.log("LOG: API GET 'api/users/user_id/posts")
    return postsData
  } catch (err) {
    console.error("Error in get Posts api:", err.message)
    throw err
  }
}

export const toggleLike = async (likeable, likeableId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/${likeable}/${likeableId}/likes/toggle_like`,
      {
        method: "POST",
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    const likeData = await response.json()
    // console.log("LOG: API POST 'api/likes/")
    return likeData
  } catch (err) {
    console.error("Error in create like api:", err.message)
    throw err
  }
}

export const createComment = async (formData, postId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(formData),
    })
    await checkResponse(response)
    const commentData = await response.json()
    // console.log("API create Comment response:", commentData)
    return commentData
  } catch (err) {
    console.error("Error in create a Comment api:", err.message)
    throw err
  }
}
