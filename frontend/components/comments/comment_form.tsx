import React, { FormEvent, useState } from "react"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { useAuth } from "../../context/auth"
import { createComment } from "../../utils/axios"
import { CircleLoader } from "react-spinners"
import { Comment } from "../../utils/types"

interface CommentFormProps {
  onCommentSubmit: (comment: Comment) => void
  toggle: (value: boolean) => void
  parentCommentId: string | null
  itemId: string // can be either postId or photoId
  itemType: "post" | "photo" // indicates whether it's a post or a photo
}

function CommentForm({
  onCommentSubmit,
  toggle,
  parentCommentId,
  itemId,
  itemType,
}: CommentFormProps): React.ReactElement {
  const { currentUser } = useAuth()
  const commentAs = `Comment as ${currentUser?.displayName}`
  const [text, setText] = useState("")
  const [formErr, setFormErr] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const newCommentData = (): Partial<Comment> => {
    if (parentCommentId === null) {
      return {
        text,
      }
    } else {
      return {
        text,
        parentCommentId: parentCommentId,
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    const commentData = newCommentData()
    try {
      const commentResponse = await createComment(commentData, itemId, itemType)
      if (commentResponse) {
        setText("")
        setFormErr("")
        setIsUploading(false)
        onCommentSubmit(commentResponse)
        toggle(false)
      }
    } catch (err) {
      setFormErr(err.message)
      setIsUploading(false)
    }
  }

  return (
    <form className="new-comment-form" onSubmit={handleSubmit}>
      <div className="comment-input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={commentAs}
          rows={2}
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
