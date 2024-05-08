import React from "react"
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

const UserProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-header-container">
        <ProfileHeader />
      </div>
      <div className="profile-posts-container">
        <PostsPage />
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
