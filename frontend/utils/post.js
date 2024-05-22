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
    console.log("API create POST response:", postData)
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
    })
    await checkResponse(response)
    const postsData = await response.json()
    console.log("LOG: API GET 'api/users/user_id/posts")
    return postsData
  } catch (err) {
    console.error("Error in get Posts api:", err.message)
    throw err
  }
}
