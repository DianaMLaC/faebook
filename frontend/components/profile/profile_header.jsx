import React, { useState } from "react"
import { useAuth } from "../../context/auth"

const ProfileHeader = () => {
  const { currentUser } = useAuth()

  return (
    <header className="profile-header">
      <section className="cover-photo-container">
        <div className="cover-photo"></div>
        <button className="cover-photo-button">Add cover photo</button>
      </section>

      <section className="profile-photo-container">
        <div className="profile-photo"></div>
      </section>

      <div className="profile-display-name-container">
        <div>
          <button className="profile-photo-button">Edit</button>
          <h1 class="profile-display-name">{currentUser.displayName}</h1>
        </div>

        <div className="profile-header-nav-buttons">
          <button className="add-to-story-button"> + Add to story</button>
          <button className="edit-profile-button">Edit profile</button>
        </div>
      </div>

      <nav className="profile-header-nav">
        <div className="profile-header-nav-links">
          <a className="posts-link" href="#posts">
            Posts
          </a>
          <a className="about-link" href="#about">
            About
          </a>
          <a className="friends-link" href="#friends">
            Friends
          </a>
          <a className="photos-link" href="#photos">
            Photos
          </a>
          <a className="videos-link" href="#videos">
            Videos
          </a>
          <a className="check-ins-link" href="#checkins">
            Check-ins
          </a>
          <a className="more-link" href="#more">
            More
          </a>
        </div>
        <button className="nav-profile-header-button">...</button>
      </nav>
    </header>
  )
}

export default ProfileHeader
