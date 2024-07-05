import axios, { AxiosError, AxiosResponse } from "axios"
import { User, NewUserData, SessionData } from "./types"

export const customHeaders = {
  "content-type": "application/json;charset=UTF-8",
}

interface BackendErrorResponse {
  errors: {
    user: { [key: string]: string }
  }
}

export async function checkResponse(response: AxiosResponse) {
  // console.log("CALLED", { response })
  if (response.status < 200 || response.status >= 300) {
    const backendErrorResponse: BackendErrorResponse = response.data

    if (backendErrorResponse && backendErrorResponse.errors && backendErrorResponse.errors.user) {
      const backendErrorList = backendErrorResponse.errors.user
      const errorMessages = Object.values(backendErrorList)
      throw new Error(errorMessages.join("\n"))
    } else {
      throw new Error("An error occurred. Please try again.")
    }
  }
  return response
}

export async function extractError<T>(error: AxiosError): Promise<T> {
  if (error?.response?.data) {
    return error.response.data as T
  }
  console.error(error)
  throw new Error("unknown API error occurred")
}

// POST USER

export const postUser = async (userData: NewUserData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/users", userData, {
      headers: customHeaders,
    })
    await checkResponse(response)
    const user = response.data
    return user
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error("API error:", err.response.data)
      const backendErrorResponse: BackendErrorResponse = err.response.data
      throw backendErrorResponse.errors.user
    } else {
      console.error("Error with response code or parsing response in API POST User", err)
      throw err
    }
  }
}

interface KnownServerError<A> {
  errors: A
}

interface AuthServerError {
  authentication: string
}

type AuthErrorResponse = KnownServerError<AuthServerError>

// POST SESSION

export const postSession = async (sessionData: SessionData) => {
  try {
    const response = await axios.post<User>(
      "http://localhost:3000/api/authentications",
      sessionData,
      {
        headers: customHeaders,
      }
    )
    // await checkResponse(response)
    const session = response.data
    return session
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const knownServerError = await extractError<AuthErrorResponse>(error)
      throw new Error(knownServerError.errors.authentication)
    }
    console.error("received non axios error")
    throw new Error("unknown error")
  }
}

// DELETE SESSION

export const deleteSession = async () => {
  try {
    const response = await axios.delete("http://localhost:3000/api/authentications", {
      headers: customHeaders,
    })
    await checkResponse(response)
  } catch (err) {
    console.error("Error with response code or parsing response in API DELETE Session", err)
  }
}
