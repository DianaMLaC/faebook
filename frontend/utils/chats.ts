import { customHeaders, checkResponse, extractError } from "./authentication"
import { BackendErrorResponse, Chat } from "./types"
import axios from "axios"

export const initiateChat = async (senderId: string, recipientId: string): Promise<Chat> => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/chats/`,
      { sender_id: senderId, recipient_id: recipientId },
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error with response code or parsing response in API POST Chat", err)
    throw err
  }
}

export const fetchChat = async (chatId: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/chats${chatId}`, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error with response code or parsing response in API GET Chat", err)
    throw err
  }
}

export const createMessage = async (chatId: string, body: string, senderId: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/chats/${chatId}/messages`,
      { body, sender_id: senderId },
      {
        headers: customHeaders,
      }
    )
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error with response code or parsing response in API POST Message", err)
    throw err
  }
}

export const fetchMessages = async (chatId: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/chats/${chatId}/messages`, {
      headers: customHeaders,
    })
    await checkResponse(response)
    return response.data
  } catch (err) {
    console.error("Error with response code or parsing response in API GET Message", err)
    throw err
  }
}
