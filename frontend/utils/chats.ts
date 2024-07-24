import { customHeaders, checkResponse, extractError } from "./authentication"
import { BackendErrorResponse } from "./types"
import axios from "axios"

export const createChat = async (recipientId: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/chats/`,
      { recipient_id: recipientId },
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error with response code or parsing response in API POST User", err)
    throw err
  }
}

export const fetchChat = async (chatId: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/chats${chatId}`, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error with response code or parsing response in API POST User", err)
    throw err
  }
}
