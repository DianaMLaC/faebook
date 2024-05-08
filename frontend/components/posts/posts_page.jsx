import React from "react"
import Intro from "./intro"
import Photos from "./photos"

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
      </div>
      <div className="posts-right">
        <div className="create-post-container">create post</div>
        <div className="posts-index-container">Post Index</div>
      </div>
    </div>
  )
}

export default PostsPage
