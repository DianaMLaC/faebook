import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { FaUserFriends, FaRegComment } from "react-icons/fa"
import { BiSolidLike, BiLike } from "react-icons/bi"
import { PiShareFat } from "react-icons/pi"
import { RiDeleteBinLine } from "react-icons/ri"
import { useAuth } from "../../context/auth"
import { usePosts } from "../../context/posts"
import { toggleLike, fetchTopLevelComments, destroyPost } from "../../utils/axios"
import { formatPostDate } from "../../utils/helpers"
import { icon } from "../../utils/helpers"
import Likes from "./likes"
import Comments from "../comments/comments_index"
import CommentForm from "../comments/comment_form"
import PhotoSmall from "../photos/photo-ts"
import PostUrl from "./post-url"

function PostContainer({ post }): React.ReactElement {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [likes, setLikes] = useState(post.likes || [])
  const { addLikeToPost, deleteLikeFromPost, addCommentToPost, deletePost } = usePosts()
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    post.likes.some((like) => like.liker.id === currentUser?.id)
  )
  const [comments, setComments] = useState(post.comments || [])
  const [toggleCommenting, setToggleCommenting] = useState(false)
  const [toggleMore, setToggleMore] = useState(false)

  const postTimeStamp = formatPostDate(post.createdAt)

  useEffect(() => {
    // console.log(post)
    async function fetchCommentsData() {
      const commentsData = await fetchTopLevelComments(post.id, "post")
      setComments(commentsData.comments)
    }

    fetchCommentsData()
    setLikedByCurrentUser(post.likes.some((like) => like.liker.id === currentUser?.id))
    setLikes(post.likes)
  }, [post.id])

  const renderPostContent = () => {
    switch (post.contentType) {
      case "Photo":
        return <PhotoSmall photo={post.content!} className="post" />
      case "PostUrl":
        return <PostUrl url={post.content!} />
      default:
        return <div>Post Content</div>
    }
  }

  const handlePostLike = async (e) => {
    e.preventDefault()
    const likeable = "posts"
    const likeResponse = await toggleLike(likeable, post.id)

    if (likeResponse) {
      if (likedByCurrentUser) {
        deleteLikeFromPost(post.id, likeResponse.id)
        setLikes(likes.filter((like) => like.id !== likeResponse.id))
      } else {
        addLikeToPost(post.id, likeResponse)
        setLikes([...likes, likeResponse])
      }
      setLikedByCurrentUser(!likedByCurrentUser)
    }
  }

  const handleNewComment = useCallback(
    (newComment) => {
      addCommentToPost(post.id, newComment)
      setComments((prevComments): Comment[] => [...prevComments, newComment])
    },
    [post.id, addCommentToPost]
  )

  const handleFriendClick = () => {
    navigate(`/profile-page/${post.author.id}/posts`)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const deletePostResponse = await destroyPost(post.id)
    if (deletePostResponse) {
      deletePost(post.id)
    }
  }

  return (
    <div className="post-container">
      <header className="post-header">
        <div className="post-header-left">
          <div className="avatar" onClick={handleFriendClick}>
            {post.author.profilePhotoUrl ? (
              <img className="profile-photo" src={post.author.profilePhotoUrl} alt="Profile" />
            ) : (
              <img className="missing-profile-photo" src={icon.noProfilePhoto} alt="Faebook" />
            )}
          </div>
          <div className="post-details">
            <div className="post-user-display-name" onClick={handleFriendClick}>
              {post.author.displayName}
            </div>
            <div className="post-visibility">
              <div className="post-created-at">{postTimeStamp}</div>
              <FaUserFriends />
            </div>
          </div>
        </div>
        {toggleMore && (
          <div className="more-menu">
            <div className="delete-post" onClick={handleDelete}>
              <RiDeleteBinLine />
            </div>
          </div>
        )}
        <div className="more-button" onClick={() => setToggleMore(!toggleMore)}>
          ...
        </div>
      </header>

      <div className="post-body">{post.body}</div>

      {post.content && <div className="post-content">{renderPostContent()}</div>}

      {likes.length > 0 && <Likes likes={likes} position={"post"} />}

      <div className="post-action-buttons">
        <div className={likedByCurrentUser ? "liked" : "like"} onClick={handlePostLike}>
          {likedByCurrentUser ? <BiSolidLike /> : <BiLike />}
          <div className="action-name">Like</div>
        </div>
        <div className="comment">
          <FaRegComment />
          <div className="action-name">Comment</div>
        </div>
        <div className="share">
          <PiShareFat />
          <div className="action-name">Share</div>
        </div>
      </div>

      {comments && <Comments comments={comments} parentType={"post"} />}

      <div className="post-comment">
        <div className="comment-avatar">
          {currentUser?.profilePhotoUrl && (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          )}
        </div>

        {toggleCommenting ? (
          <CommentForm
            onCommentSubmit={handleNewComment}
            toggle={setToggleCommenting}
            parentCommentId={null}
            itemId={post.id}
            itemType="post" // Updated prop
          />
        ) : (
          <div className="comment-input-bar" onClick={() => setToggleCommenting(true)}>
            Write a comment...
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContainer
