import { User } from "./user"

declare global {
  interface Window {
    currentUser: User | null
  }
}

export {}
