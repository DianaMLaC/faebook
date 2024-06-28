import React from "react"
import Intro from "./intro"
import Photos from "./photos"
import CreatePost from "./create-post-container"
import PostsIndex from "./posts_index"
import PostsFriends from "./posts_friends"
import AboutMe from "../user_profile_details/about-me"

function PostsPage(): React.ReactElement {
  return (
    <>
      <div className="posts-page">
        <div className="posts-left">
          <div className="posts-intro">
            <Intro />
          </div>
          <div className="posts-photos">
            <Photos />
          </div>
          <div className="posts-friends">
            <PostsFriends />
          </div>
        </div>
        <div className="posts-right">
          <div className="create-post-container">
            <CreatePost />
          </div>
          <div className="posts-index-container">
            <PostsIndex />
          </div>
        </div>
      </div>
      <div className="profile-about-me-container">
        <AboutMe />
      </div>
    </>
  )
}

export default PostsPage
