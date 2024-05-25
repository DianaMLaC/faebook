import React, { createContext, useState, useContext } from "react"

export const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  // Add a like to a specific post
  const addLikeToPost = (postId, like) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: [...post.likes, like] } : post
      )
    )
  }

  // Remove a like from a specific post
  const deleteLikeFromPost = (postId, likeId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes.filter((like) => like.id !== likeId) }
          : post
      )
    )
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, addLikeToPost, deleteLikeFromPost }}>
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
