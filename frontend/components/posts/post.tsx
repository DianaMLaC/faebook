import React, { useState, useEffect, useCallback } from "react"
import { FaUserFriends, FaRegComment } from "react-icons/fa"
import { BiSolidLike, BiLike } from "react-icons/bi"
import { PiShareFat, PiPaperPlaneRightFill } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { toggleLike, fetchTopLevelComments } from "../../utils/post_and_comments"
import { usePosts } from "../../context/posts"
import Likes from "./likes"
import Comments from "../comments/comments_index"
import CommentForm from "../comments/comment_form"
import { formatPostDate } from "../../utils/helpers"
import { useNavigate } from "react-router-dom"
import { fetchPhoto } from "../../utils/profile"
import { Photo } from "../../utils/types"
import PhotoViewer from "../photos/photo-viewer"
import PhotoSmall from "../photos/photo-ts"

function PostContainer({ post }): React.ReactElement {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [likes, setLikes] = useState(post.likes || [])
  const { addLikeToPost, deleteLikeFromPost, addCommentToPost } = usePosts()
  const [content, setContent] = useState<Photo | null>(null)
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    post.likes.some((like) => like.liker.id === currentUser?.id)
  )
  const [comments, setComments] = useState(post.comments || [])
  const [toggleCommenting, setToggleCommenting] = useState(false)

  const postTimeStamp = formatPostDate(post.createdAt)

  useEffect(() => {
    if (!post.contentType) {
      return
    }
    async function fetchPostContent() {
      if ((post.contentType = "Photo")) {
        const contentData = await fetchPhoto(post.author.id, post.contentId)
        if (contentData) {
          setContent(contentData)
        }
      }
    }

    fetchPostContent()
  }, [post.contentType])

  useEffect(() => {
    console.log(post)
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
        return <PhotoSmall photo={content!} className="post" />
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

  return (
    <div className="post-container">
      <header className="post-header">
        <div className="post-header-left">
          <div className="avatar" onClick={handleFriendClick}>
            {post.author.profilePhotoUrl ? (
              <img className="profile-photo" src={post.author.profilePhotoUrl} alt="Profile" />
            ) : (
              <img
                className="missing-profile-photo"
                src="/assets/images/missing-profile-pic.png"
                alt="Faebook"
              />
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
        <div className="more-button">...</div>
      </header>

      <div className="post-body">{post.body}</div>
      {content && <div className="post-content">{renderPostContent()}</div>}
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
