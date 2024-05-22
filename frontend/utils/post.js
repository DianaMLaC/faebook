import { customHeaders } from "./authentication"
import { checkResponse } from "./authentication"

export const createPost = async (postData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${postData.profileId}/posts`, {
      method: "POST",
      headers: customHeaders,
      body: formData,
    })
    await checkResponse(response)
    const postResponse = await response.json()
    console.log("API create POST response:", postResponse)
    return postResponse
  } catch (err) {
    console.error("Error in create a Post api:", err.message)
    throw err
  }
}
