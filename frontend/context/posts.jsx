import React, { createContext, useState, useContext } from "react"

export const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  return <PostsContext.Provider value={{ posts, addPost }}>{children}</PostsContext.Provider>
}

export const usePosts = () => useContext(PostsContext)
