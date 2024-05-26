import React, { useState } from "react"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { createComment } from "../../utils/post_and_comments"
import { CircleLoader } from "react-spinners"

const CommentForm = ({ onCommentSubmit, parentCommentId, postId }) => {
  const { currentUser } = useAuth()
  const commentAs = `Comment as ${currentUser.displayName}`
  const [text, setText] = useState("")
  const [formErr, setFormErr] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const formData = () => {
    if (parentCommentId === null) {
      return {
        text,
      }
    } else {
      return {
        text,
        parent_comment_id: parentCommentId,
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    const commentData = formData()
    try {
      const commentResponse = await createComment(commentData, postId)
      if (commentResponse) {
        setText("")
        setFormErr("")
        setIsUploading(false)
        onCommentSubmit(commentResponse)
      }
    } catch (err) {
      setFormErr(err.message)
    }
  }

  return (
    <form className="new-comment-form" onSubmit={handleSubmit}>
      <div className="comment-input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={commentAs}
          rows="2"
        />
        {formErr ? (
          <div className="form-errors">{formErr}</div>
        ) : (
          <div className="spinner">{isUploading && <CircleLoader loading={isUploading} />}</div>
        )}
      </div>
      <button type="submit" disabled={!text.trim()}>
        <PiPaperPlaneRightFill />
      </button>
    </form>
  )
}

export default CommentForm
