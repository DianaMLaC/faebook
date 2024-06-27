import React, { createContext, useState, useContext } from "react"
import { Photo, Like, Comment, PhotosContextType } from "../utils/types"

interface PhotosProviderProps {
  children: React.ReactNode
}

const PhotosContext = createContext<PhotosContextType | null>(null)

function PhotosProvider({ children }: PhotosProviderProps): React.ReactElement {
  const [photos, setPhotos] = useState<Photo[]>([])

  function addPhoto(newPhoto: Photo): void {
    setPhotos((prevPhotos): Photo[] => [newPhoto, ...prevPhotos])
  }

  function addLikeToPhoto(photoId: string, like: Like): void {
    setPhotos((prevPhotos): Photo[] =>
      prevPhotos.map(
        (photo): Photo =>
          photo.id === photoId ? { ...photo, likes: [...photo.likes, like] } : photo
      )
    )
  }

  function deleteLikeFromPhoto(photoId: string, likeId: string): void {
    setPhotos((prevPhotos): Photo[] =>
      prevPhotos.map(
        (photo): Photo =>
          photo.id === photoId
            ? { ...photo, likes: photo.likes.filter((like) => like.id !== likeId) }
            : photo
      )
    )
  }

  function addCommentToPhoto(photoId: string, comment: Comment): void {
    setPhotos((prevPhotos): Photo[] =>
      prevPhotos.map(
        (photo): Photo =>
          photo.id === photoId ? { ...photo, comments: [...photo.comments, comment] } : photo
      )
    )
  }

  function deleteCommentFromPhoto(photoId: string, commentId: string): void {
    setPhotos((prevPhotos): Photo[] =>
      prevPhotos.map(
        (photo): Photo =>
          photo.id === photoId
            ? { ...photo, comments: photo.comments.filter((comment) => comment.id !== commentId) }
            : photo
      )
    )
  }

  function addLikeToComment(photoId: string, commentId: string, like: Like): void {
    setPhotos((prevPhotos): Photo[] =>
      prevPhotos.map(
        (photo): Photo =>
          photo.id === photoId
            ? {
                ...photo,
                comments: photo.comments.map(
                  (comment): Comment =>
                    comment.id === commentId
                      ? { ...comment, likes: [...comment.likes, like] }
                      : comment
                ),
              }
            : photo
      )
    )
  }

  function deleteLikeFromComment(photoId: string, commentId: string, likeId: string): void {
    setPhotos((prevPhotos): Photo[] =>
      prevPhotos.map(
        (photo): Photo =>
          photo.id === photoId
            ? {
                ...photo,
                comments: photo.comments.map(
                  (comment): Comment =>
                    comment.id === commentId
                      ? { ...comment, likes: comment.likes?.filter((like) => like.id !== likeId) }
                      : comment
                ),
              }
            : photo
      )
    )
  }

  function addReplyToComment(photoId: string, commentId: string, reply: Comment): void {
    setPhotos((prevPhotos): Photo[] =>
      prevPhotos.map(
        (photo): Photo =>
          photo.id === photoId
            ? {
                ...photo,
                comments: photo.comments.map(
                  (comment): Comment =>
                    comment.id === commentId
                      ? { ...comment, replies: [...comment.replies, reply] }
                      : comment
                ),
              }
            : photo
      )
    )
  }

  return (
    <PhotosContext.Provider
      value={{
        photos,
        addPhoto,
        addLikeToPhoto,
        deleteLikeFromPhoto,
        addCommentToPhoto,
        deleteCommentFromPhoto,
        addLikeToComment,
        deleteLikeFromComment,
        addReplyToComment,
      }}
    >
      {children}
    </PhotosContext.Provider>
  )
}

function usePhotos(): PhotosContextType {
  const context = useContext(PhotosContext)
  if (!context) {
    throw new Error("usePhotos must be used within a PhotosProvider")
  }
  return context
}

export { PhotosProvider, usePhotos }
export default PhotosProvider
