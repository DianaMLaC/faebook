import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { fetchPosts } from "../../utils/post"
import Post from "./post"
import { usePosts } from "../../context/posts"

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
      console.log("postsData from fetched posts:", postsData)
      setPostsDb(postsData["posts"])
    }

    fetchPostsData()
    console.log("posts-state:", posts)
  }, [profileUser, setPostsDb, posts])

  return (
    <ul className="posts-list">
      {postsDb && postsDb.map((post) => <Post key={post.id} post={post} />)}
    </ul>
  )
}

export default PostsIndex
