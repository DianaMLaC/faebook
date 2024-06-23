// Define the types for user and profile data
export interface User {
  id: number
  email: string
  displayName: string
  dateOfBirth: string
  profilePhotoUrl?: string
  coverPhotoUrl?: string
  intro?: Intro
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
  createdAt: string
  url: string
  description?: string
  albumName?: string
}

export interface Album {
  id: number
  name: string
  coverPhotoUrl: string
  photosCount: number
}

export interface Intro {
  id?: number
  house?: string
  education?: string
  location?: string
  elements?: string
  zodiac?: string
  order?: string
}

export interface AuthContextType {
  currentUser: User | null
  profileUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  setProfileUser: React.Dispatch<React.SetStateAction<User | null>>
  signup: (newUserData: any) => Promise<void>
  login: (userData: any) => Promise<void>
  logout: () => Promise<void>
}

export interface FriendsContextType {
  acceptedFriends: Friendship[]
  pendingFriendships: Friendship[]
  setAcceptedFriends: React.Dispatch<React.SetStateAction<Friendship[]>>
  setPendingFriendships: React.Dispatch<React.SetStateAction<Friendship[]>>
  addAcceptedFriend: (friend: Friendship) => void
  removePendingFriendship: (friendshipId: number) => void
}

export interface PostsContextType {
  posts: Post[]
  addPost: (newPost: Post) => void
  addLikeToPost: (postId: number, like: Like) => void
  deleteLikeFromPost: (postId: number, likeId: number) => void
  addCommentToPost: (postId: number, comment: Comment) => void
  deleteCommentFromPost: (postId: number, commentId: number) => void
  addLikeToComment: (postId: number, commentId: number, like: Like) => void
  deleteLikeFromComment: (postId: number, commentId: number, likeId: number) => void
  addReplyToComment: (postId: number, commentId: number, reply: Comment) => void
}
