import React, { createContext, useState, useContext } from "react"
import { Friendship, FriendshipData } from "../types/user"

interface FriendsContextType {
  acceptedFriends: Friendship[]
  pendingFriendships: Friendship[]
  setAcceptedFriends: React.Dispatch<React.SetStateAction<Friendship[]>>
  setPendingFriendships: React.Dispatch<React.SetStateAction<Friendship[]>>
  addAcceptedFriend: (friend: Friendship) => void
  removePendingFriendship: (friendshipId: number) => void
}

interface FriendsProviderProps {
  children: React.ReactNode
}

export const FriendsContext = createContext<FriendsContextType | null>(null)

function FriendsProvider({ children }: FriendsProviderProps): React.ReactElement {
  const [acceptedFriends, setAcceptedFriends] = useState<Friendship[]>([])
  const [pendingFriendships, setPendingFriendships] = useState<Friendship[]>([])

  function addAcceptedFriend(friend: Friendship): void {
    setAcceptedFriends((prevFriends): Friendship[] => [...prevFriends, friend])
    setPendingFriendships((prevRequests): Friendship[] =>
      prevRequests.filter((req) => req.friendshipId !== friend.friendshipId)
    )
  }

  function removePendingFriendship(friendshipId: number): void {
    setPendingFriendships((prevRequests) =>
      prevRequests.filter((req) => req.friendshipId !== friendshipId)
    )
  }

  return (
    <FriendsContext.Provider
      value={{
        acceptedFriends,
        pendingFriendships,
        setAcceptedFriends,
        setPendingFriendships,
        addAcceptedFriend,
        removePendingFriendship,
      }}
    >
      {children}
    </FriendsContext.Provider>
  )
}

function useFriends(): FriendsContextType {
  const context = useContext(FriendsContext)
  if (!context) {
    throw new Error("useFriends must be used within a FriendsProvider")
  }
  return context
}

export { FriendsProvider, useFriends }
export default FriendsProvider
