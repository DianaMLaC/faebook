import React, { createContext, useState, useContext } from "react"
import { Post, Like, Comment, PostsContextType } from "../utils/types"

interface PostsProviderProps {
  children: React.ReactNode
}

const PostsContext = createContext<PostsContextType | null>(null)

function PostsProvider({ children }: PostsProviderProps): React.ReactElement {
  const [posts, setPosts] = useState<Post[]>([])

  function addPost(newPost: Post): void {
    setPosts((prevPosts): Post[] => [newPost, ...prevPosts])
  }

  // Add a like to a specific post
  function addLikeToPost(postId: string, like: Like): void {
    setPosts((prevPosts): Post[] =>
      prevPosts.map(
        (post): Post => (post.id === postId ? { ...post, likes: [...post.likes, like] } : post)
      )
    )
  }

  // Remove a like from a specific post
  function deleteLikeFromPost(postId: string, likeId: string): void {
    setPosts((prevPosts): Post[] =>
      prevPosts.map(
        (post): Post =>
          post.id === postId
            ? { ...post, likes: post.likes.filter((like) => like.id !== likeId) }
            : post
      )
    )
  }

  // Add a comment to a specific post
  function addCommentToPost(postId: string, comment: Comment): void {
    setPosts((prevPosts): Post[] =>
      prevPosts.map(
        (post): Post =>
          post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    )
  }

  // Remove a like from a specific post
  function deleteCommentFromPost(postId: string, commentId: string): void {
    setPosts((prevPosts): Post[] =>
      prevPosts.map(
        (post): Post =>
          post.id === postId
            ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
            : post
      )
    )
  }

  // Add a like to a comment on a specific post
  function addLikeToComment(postId: string, commentId: string, like: Like): void {
    setPosts((prevPosts): Post[] =>
      prevPosts.map(
        (post): Post =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map(
                  (comment): Comment =>
                    comment.id === commentId
                      ? { ...comment, likes: [...comment.likes, like] }
                      : comment
                ),
              }
            : post
      )
    )
  }

  // Remove a like from a comment on a specific post
  function deleteLikeFromComment(postId: string, commentId: string, likeId: string): void {
    setPosts((prevPosts): Post[] =>
      prevPosts.map(
        (post): Post =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map(
                  (comment): Comment =>
                    comment.id === commentId
                      ? { ...comment, likes: comment.likes?.filter((like) => like.id !== likeId) }
                      : comment
                ),
              }
            : post
      )
    )
  }

  function addReplyToComment(postId: string, commentId: string, reply: Comment): void {
    setPosts((prevPosts): Post[] =>
      prevPosts.map(
        (post): Post =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map(
                  (comment): Comment =>
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

function usePosts(): PostsContextType {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider")
  }
  return context
}

export { PostsProvider, usePosts }
export default PostsProvider
