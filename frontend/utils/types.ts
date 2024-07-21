// Define the types for user and profile data
export interface User {
  id: string
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
  friendshipId: string
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
  id: string
  likeableId: number
  likeableType: string
  liker: {
    id: string
    displayName: string
    profilePhotoUrl: string
  }
}

export interface Comment {
  id?: string
  text: string
  createdAt?: string
  postId?: string
  photoId?: string
  parentCommentId?: string | null
  author?: {
    id: string
    displayName: string
    profilePhotoUrl: string
  }
  likes: Like[]
  replies: Comment[]
}

export interface Post {
  id: string
  body: string
  createdAt: string
  author: {
    id: string
    displayName: string
    profilePhotoUrl: string
  }
  likes: Like[]
  comments: Comment[]
}

export interface Photo {
  id: string
  albumId: string
  description?: string
  createdAt: string
  url: string
  albumName?: string
  likes: Like[]
  comments: Comment[]
}

export interface Album {
  id: string
  name: string
  coverPhotoUrl: string
  photosCount: number
  photos: Photo[]
}

export interface Intro {
  id?: string
  house?: string
  education?: string
  location?: string
  elements?: string
  zodiac?: string
  order?: string
}

export interface Chat {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  participants: User[]
}

export interface Message {
  id: string
  body: string
  createdAt: string
  senderId: string
  chatId: string
}

export interface WebSocketContextType {
  messages: Message[]
  sendMessage: (chatId: string, body: string) => void
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
  addLikeToPost: (postId: string, like: Like) => void
  deleteLikeFromPost: (postId: string, likeId: string) => void
  addCommentToPost: (postId: string, comment: Comment) => void
  deleteCommentFromPost: (postId: string, commentId: string) => void
  addLikeToComment: (postId: string, commentId: string, like: Like) => void
  deleteLikeFromComment: (postId: string, commentId: string, likeId: string) => void
  addReplyToComment: (postId: string, commentId: string, reply: Comment) => void
}

export interface PhotosContextType {
  photos: Photo[]
  addPhoto: (newPhoto: Photo) => void
  addLikeToPhoto: (photoId: string, like: Like) => void
  deleteLikeFromPhoto: (photoId: string, likeId: string) => void
  addCommentToPhoto: (photoId: string, comment: Comment) => void
  deleteCommentFromPhoto: (photoId: string, commentId: string) => void
  addLikeToComment: (photoId: string, commentId: string, like: Like) => void
  deleteLikeFromComment: (photoId: string, commentId: string, likeId: string) => void
  addReplyToComment: (photoId: string, commentId: string, reply: Comment) => void
}
