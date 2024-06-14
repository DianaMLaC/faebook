import { User } from "./types"

declare global {
  interface Window {
    currentUser: User | null
  }
}

export {}
