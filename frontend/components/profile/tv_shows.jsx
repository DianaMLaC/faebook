import React, { useState } from "react"

const TvShows = () => {
  const [activeView, setActiveView] = useState("watched")
  const [activeLink, setActiveLink] = useState("watched")

  const handleViewChange = (e, view) => {
    e.preventDefault()
    setActiveView(view)
    setActiveLink(view)
  }

  const getViewComponent = () => {
    switch (activeView) {
      case "watched":
        return <p> No Watched to show</p>
      case "tv-shows":
        return <p> No tv-shows to show</p>
      default:
        return null
    }
  }

  return (
    <div className="tv-shows-container">
      <header className="tv-shows-header">
        <h4>Tv Shows</h4>
        <div className="tv-shows-header-more-button">...</div>
      </header>
      <nav className="tv-shows-nav">
        <a
          href="#tv-shows-teams"
          onClick={(e) => handleViewChange(e, "watched")}
          className={activeLink === "watched" ? "active" : ""}
        >
          Watched
        </a>
        <a
          href="#tv-shows-liked"
          onClick={(e) => handleViewChange(e, "tv-shows")}
          className={activeLink === "tv-shows" ? "active" : ""}
        >
          Tv Shows
        </a>
      </nav>
      <div className="no-info-to-show">{getViewComponent()}</div>
    </div>
  )
}

export default TvShows
