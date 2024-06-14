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

export interface NewUserData {
  email: string
  lastName: string
  firstName: string
  dateOfBirth: string
  password: string
}

export interface SessionData {
  email: string
  password: string
}

export interface Friendship {
  friendshipId: number
  friendshipStatus: string
  user: User
}

export interface FriendshipData {
  friends: {
    accepted: Friendship[]
    requests: Friendship[]
  }
  existing_relation: ExistingRelation | null
}

export type ExistingRelation = {
  friendship_accepted: boolean | null
}

export interface Like {
  id: number
  likeableId: number
  likeableType: string
  liker: {
    id: number
    displayName: string
    profilePhotoUrl: string
  }
}

export interface Comment {
  id: number
  text: string
  createdAt: string
  postId: number
  parentCommentId: number | null
  author: {
    id: number
    displayName: string
    profilePhotoUrl: string
  }
  likes: Like[]
  replies: Comment[]
}

export interface Post {
  id: number
  body: string
  createdAt: string
  author: {
    id: number
    displayName: string
    profilePhotoUrl: string
  }
  likes: Like[]
  comments: Comment[]
}

export interface Photo {
  id: number
  albumName: string
  url: string
  description?: string
}

export interface Album {
  id: number
  name: string
  coverPhotoUrl: string
  photosCount: number
}

export interface Intro {
  id?: number
  work?: string
  education?: string
  location?: string
  relationship?: string
}
