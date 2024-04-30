import React from "react"
import { useAuth } from "../../context/auth"
import ProfileHeader from "./profile_header"
import PhotosPage from "../photos/photos_page"
import AboutMe from "../user_profile_details/about_me"

const UserProfile = () => {
  const { currentUser } = useAuth()
  const { logout } = useAuth()

  return (
    <div className="profile-page">
      <div className="profile-header-container">
        <ProfileHeader />
      </div>
      <div className="profile-about-me-container">
        <AboutMe />
      </div>
      <div className="profile-pages-container">
        <PhotosPage />
      </div>
    </div>
  )
}

export default UserProfile
