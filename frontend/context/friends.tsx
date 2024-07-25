import React, { createContext, useState, useContext } from "react"
import { FriendshipFriend, FriendsContextType } from "../utils/types"

interface FriendsProviderProps {
  children: React.ReactNode
}

export const FriendsContext = createContext<FriendsContextType | null>(null)

function FriendsProvider({ children }: FriendsProviderProps): React.ReactElement {
  const [acceptedFriends, setAcceptedFriends] = useState<FriendshipFriend[]>([])
  const [pendingFriendships, setPendingFriendships] = useState<FriendshipFriend[]>([])

  function addAcceptedFriend(friend: FriendshipFriend): void {
    setAcceptedFriends((prevFriends): FriendshipFriend[] => [...prevFriends, friend])
    setPendingFriendships((prevRequests): FriendshipFriend[] =>
      prevRequests.filter((req) => req.friendshipId !== friend.friendshipId)
    )
  }

  function removePendingFriendship(friendshipId: string): void {
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
