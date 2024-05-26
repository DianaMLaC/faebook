import React, { useEffect, useState } from "react"
import ProfileHeader from "./profile_header"
import PhotosPage from "../photos/photos_page"
import AboutMe from "../user_profile_details/about_me"
import Sports from "./sports"
import Music from "./music"
import Movies from "./movies"
import TvShows from "./tv_shows"
import Books from "./books"
import Videos from "./videos"
import CheckIns from "./check_ins"
import PostsPage from "../posts/posts_page"
import { fetchUserProfile } from "../../utils/profile"
import { useAuth } from "../../context/auth"
import { PostsProvider } from "../../context/posts"

const UserProfile = ({ profileId }) => {
  const { profileUser, setProfileUser } = useAuth()

  useEffect(() => {
    if (profileId === null) {
      console.log("no profile id")
      return
    }

    async function fetchProfile() {
      try {
        const profileUserData = await fetchUserProfile(profileId)
        // console.log("profileUserData", { profileUserData })
        setProfileUser(profileUserData)
        // console.log("profileUserState:", profileUser)
      } catch (err) {
        console.error("Error in fetching the User Profile", err)
      }
    }

    fetchProfile()
  }, [profileId, setProfileUser])

  useEffect(() => {
    // console.log("Updated profileUser state:", profileUser)
  }, [profileUser])

  if (!profileUser) {
    return <div>Loading profile...</div>
  }

  return (
    <div className="profile-page">
      <div className="profile-header-container">
        <ProfileHeader />
      </div>
      <div className="profile-posts-container">
        <PostsProvider>
          <PostsPage />
        </PostsProvider>
      </div>
      <div className="profile-about-me-container">
        <AboutMe />
      </div>
      <div className="profile-photos-container">
        <PhotosPage />
      </div>
      <div className="profile-videos-container">
        <Videos />
      </div>
      <div className="profile-check-ins-container">
        <CheckIns />
      </div>
      <div className="profile-sports-container">
        <Sports />
      </div>
      <div className="profile-music-container">
        <Music />
      </div>
      <div className="profile-movies-container">
        <Movies />
      </div>
      <div className="profile-tv-shows-container">
        <TvShows />
      </div>
      <div className="profile-tv-shows-container">
        <Books />
      </div>
    </div>
  )
}

export default UserProfile
