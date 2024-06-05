import React from "react"
import Intro from "./intro"
import Photos from "./photos"
import CreatePost from "./create-post-container"
import PostsIndex from "./posts_index"
import Friends from "../friends/friends_index"

const PostsPage = () => {
  return (
    <div className="posts-page">
      <div className="posts-left">
        <div className="posts-intro">
          <Intro />
        </div>
        <div className="posts-photos">
          <Photos />
        </div>
        <div className="posts-friends">
          <Friends />
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
  )
}

export default PostsPage
