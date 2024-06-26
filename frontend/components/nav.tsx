import React, { useState, ChangeEvent } from "react"
import { Outlet } from "react-router-dom"
import { fetchUserSuggestions } from "../utils/profile"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import { User } from "../utils/types"
import NavRight from "./user_profile_details/nav-right"

function NavBar(): React.ReactElement {
  const { setProfileUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [suggestions, setSuggestions] = useState<User[]>([])
  const navigate = useNavigate()

  const handleSuggestionClick = (userId: number) => {
    setProfileUser(null)
    setSuggestions([])
    navigate(`/profile-page/${userId}`)
  }

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const value = event.target.value
    setSearchTerm(value)

    if (value.trim()) {
      try {
        const dbData = await fetchUserSuggestions(value)
        if (dbData && Array.isArray(dbData.users)) {
          setSuggestions(dbData.users)
        } else {
          setSuggestions([])
        }
      } catch (error) {
        console.error("Failed to fetch user suggestions:", error)
      }
    } else {
      setSuggestions([])
    }
  }

  return (
    <div>
      <header className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo">
            <img className="nav-logo-img" src="/assets/images/logo.png" alt="Faebook" />
          </div>
          <div className="nav-search">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Find fae folk"
            />
            {suggestions && (
              <ul className={`suggestions ${suggestions.length > 0 ? "visible" : ""}`}>
                {suggestions.map((user) => (
                  <li key={user.id} onClick={() => handleSuggestionClick(user.id)}>
                    <img src={user.profilePhotoUrl} alt={user.displayName} />
                    <span>{user.displayName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="nav-center"></div>
        <NavRight />
      </header>

      <Outlet />
    </div>
  )
}

export default NavBar
