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

  // Add a comment to a specific post
  const addCommentToPost = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    )
  }

  // Remove a like from a specific post
  const deleteCommentFromPost = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
          : post
      )
    )
  }

  // Add a like to a comment on a specific post
  const addLikeToComment = (postId, commentId, like) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, likes: [...comment.likes, like] } : comment
              ),
            }
          : post
      )
    )
  }

  // Remove a like from a comment on a specific post
  const deleteLikeFromComment = (postId, commentId, likeId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes.filter((like) => like.id !== likeId) }
                  : comment
              ),
            }
          : post
      )
    )
  }

  const addReplyToComment = (postId, commentId, reply) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...comment.replies, reply] }
                  : comment
              ),
            }
          : post
      )
    )
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        addLikeToPost,
        deleteLikeFromPost,
        addCommentToPost,
        deleteCommentFromPost,
        addLikeToComment,
        deleteLikeFromComment,
        addReplyToComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
