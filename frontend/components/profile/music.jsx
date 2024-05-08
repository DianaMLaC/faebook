import React from "react"

const Music = () => {
  return (
    <div className="music-container">
      <header className="music-header">
        <h4>Music</h4>
        <div className="music-header-more-button">...</div>
      </header>
      <nav className="music-nav">
        <a href="#artists" className="active">
          Artists
        </a>
      </nav>
      <div className="no-info-to-show">
        <p> No Artists to show</p>
      </div>
    </div>
  )
}

export default Music
