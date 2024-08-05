import React from "react"

function PostUrl({ url }): React.ReactElement {
  return (
    <a href={url.url} className="post-url-container">
      <div className="post-url-image">
        <img className="photo-cover-image" src={url.image} alt={url.title} />
      </div>
      <div className="post-url-details">
        <div className="post-url-title">{url.title}</div>
        <div className="post-url-description">{url.description}</div>
      </div>
    </a>
  )
}

export default PostUrl
