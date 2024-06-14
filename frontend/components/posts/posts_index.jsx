import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { usePosts } from "../../context/posts"
import { fetchPosts } from "../../utils/post_and_comments"
import Post from "./post"

const PostsIndex = () => {
  const { posts } = usePosts()
  const [postsDb, setPostsDb] = useState(null)
  const { profileUser } = useAuth()

  useEffect(() => {
    if (profileUser.id === null) {
      console.log("no current user id")
      return
    }

    async function fetchPostsData() {
      const postsData = await fetchPosts(profileUser.id)
      // console.log("postsData from fetched posts:", postsData)
      postsData.posts.length > 0 ? setPostsDb(postsData.posts) : setPostsDb(null)
    }

    fetchPostsData()
    // console.log("posts-state:", posts)
  }, [profileUser, setPostsDb, posts])

  return (
    <>
      {postsDb ? (
        <ul className="posts-list">
          {postsDb && postsDb.map((post) => <Post key={post.id} post={post} />)}
        </ul>
      ) : (
        <div className="no-posts-data">
          <span>No posts to show</span>
        </div>
      )}
    </>
  )
}

export default PostsIndex
