import React, { useState, useEffect, useCallback } from "react"
import { FaUserFriends, FaRegComment } from "react-icons/fa"
import { BiSolidLike, BiLike } from "react-icons/bi"
import { PiShareFat, PiPaperPlaneRightFill } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { toggleLike } from "../../utils/post_and_comments"
import { usePosts } from "../../context/posts"
import Likes from "./likes"
import Comments from "../comments/comments_index"
import CommentForm from "../comments/comment_form"
import { formatPostDate } from "../../utils/helpers"

const Post = ({ post }) => {
  const { currentUser } = useAuth()
  const [likes, setLikes] = useState(post.likes || [])
  const { addLikeToPost, deleteLikeFromPost, addCommentToPost } = usePosts()
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    post.likes.some((like) => like.liker.id === currentUser.id)
  )
  const [comments, setComments] = useState(post.comments || [])
  const [toggleCommenting, setToggleCommenting] = useState(false)

  const postTimeStamp = formatPostDate(post.createdAt)

  const handleNewComment = useCallback(
    (newComment) => {
      addCommentToPost(post.id, newComment)
      setComments((prevComments) => [...prevComments, newComment])
    },
    [post.id, addCommentToPost]
  )

  useEffect(() => {
    setLikedByCurrentUser(post.likes.some((like) => like.liker.id === currentUser.id))
    setLikes(post.likes)
    setComments(post.comments)
    // console.log("likes:", { likes })
    // console.log("comments:", { comments })
    // console.log("likedByCurrentUser:", likedByCurrentUser)
  }, [post])

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

  return (
    <div className="post-container">
      <header className="post-header">
        <div className="post-header-left">
          <div className="avatar">
            {post.author.profilePhotoUrl && (
              <img className="profile-photo" src={post.author.profilePhotoUrl} alt="Profile" />
            )}
          </div>
          <div className="post-details">
            <div className="post-user-display-name">{post.author.displayName}</div>
            <div className="post-visibility">
              <div className="post-created-at">{postTimeStamp}</div>
              <FaUserFriends />
            </div>
          </div>
        </div>
        <div className="more-button">...</div>
      </header>

      <div className="post-content">{post.body}</div>

      <div className="likes-container">
        {likes.length > 0 && <Likes likes={likes} position={"post"} />}
      </div>

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
      {comments && <Comments comments={comments} />}
      <div className="post-comment">
        <div className="comment-avatar">
          {" "}
          {currentUser.profilePhotoUrl && (
            <img className="profile-photo" src={currentUser.profilePhotoUrl} alt="Profile" />
          )}
        </div>

        {toggleCommenting ? (
          <CommentForm onCommentSubmit={handleNewComment} parentCommentId={null} postId={post.id} />
        ) : (
          <div className="comment-input-bar" onClick={() => setToggleCommenting(true)}>
            Write a comment...
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
