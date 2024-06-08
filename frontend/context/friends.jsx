import React, { createContext, useState, useContext } from "react"

export const FriendsContext = createContext()

export const FriendsProvider = ({ children }) => {
  const [acceptedFriends, setAcceptedFriends] = useState([])
  const [pendingFriendships, setPendingFriendships] = useState([])

  const addAcceptedFriend = (friend) => {
    setAcceptedFriends((prevFriends) => [...prevFriends, friend])
    setPendingFriendships((prevRequests) =>
      prevRequests.filter((req) => req.friendshipId !== friend.friendshipId)
    )
  }

  const removePendingFriendship = (friendshipId) => {
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

export const useFriends = () => useContext(FriendsContext)
