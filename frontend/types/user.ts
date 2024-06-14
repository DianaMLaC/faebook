// Define the types for user and profile data
export interface User {
  id: number
  email: string
  displayName: string
  dateOfBirth: string
  profilePhotoUrl?: string
  coverPhotoUrl?: string
  intro?: {
    work?: string
    education?: string
    location?: string
    relationship?: string
  }
}

export interface newUserData {
  email: string
  lastName: string
  firstName: string
  dateOfBirth: string
  password: string
}

export interface loginData {
  email: string
  password: string
}

interface AuthContextType {
  currentUser: User | null
  profileUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  setProfileUser: React.Dispatch<React.SetStateAction<User | null>>
  signup: (newUserData: any) => Promise<void>
  login: (userData: any) => Promise<void>
  logout: () => Promise<void>
}
