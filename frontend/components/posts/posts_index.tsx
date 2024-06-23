import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { usePosts } from "../../context/posts"
import { fetchPosts } from "../../utils/post_and_comments"
import PostContainer from "./post"
import { Post } from "../../utils/types"
function PostsIndex(): React.ReactElement {
  const { posts } = usePosts()
  const [postsDb, setPostsDb] = useState<Post[] | null>(null)
  const { profileUser } = useAuth()

  useEffect(() => {
    async function fetchPostsData() {
      if (profileUser) {
        const postsData = await fetchPosts(profileUser.id)
        postsData.posts.length > 0 ? setPostsDb(postsData.posts) : setPostsDb(null)
      }
      // console.log("postsData from fetched posts:", postsData)
    }

    fetchPostsData()
    // console.log("posts-state:", posts)
  }, [profileUser, setPostsDb, posts])

  return (
    <>
      {postsDb ? (
        <ul className="posts-list">
          {postsDb && postsDb.map((post) => <PostContainer key={post.id} post={post} />)}
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
