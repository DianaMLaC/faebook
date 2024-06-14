import { User } from "../types/types"

declare global {
  interface Window {
    currentUser: User | null
  }
}

export {}
