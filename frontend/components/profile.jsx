import React from "react"
import { useAuth } from "../context/auth"

// const UserProfile = () => {
//   const { currentUser } = useAuth()

//   return (
//     <div>
//       <h1>Welcome, {currentUser.displayName}</h1>
//       <h5>This will be our user profile on which we are redirected after authentication</h5>
//     </div>
//   )
// }

const UserProfile = () => <h1> Welcome user </h1>

export default UserProfile
