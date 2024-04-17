import { customHeaders } from "./authentication"
import { checkResponse } from "./authentication"

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
