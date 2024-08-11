import axios, { AxiosError, AxiosResponse } from "axios"
import { User, NewUserData, SessionData, BackendErrorResponse } from "./types"

// Determine the base URL based on the environment
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://faebook.fly.dev/api" // Production URL
    : "http://localhost:3000/api" // Development URL

const getCsrfToken = (): string | undefined => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || undefined
}

export const customHeaders = {
  "Content-Type": "application/json;charset=UTF-8",
  "X-CSRF-Token": getCsrfToken(),
}

// Axios instance with dynamic baseURL
export const apiClient = axios.create({
  baseURL: baseURL,
  headers: customHeaders,
})

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
    const response = await apiClient.post<User>("/users", userData)
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
    const response = await apiClient.post<User>("/authentications", sessionData)
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
    const response = await apiClient.delete("/authentications")
    await checkResponse(response)
  } catch (err) {
    console.error("Error with response code or parsing response in API DELETE Session", err)
  }
}
