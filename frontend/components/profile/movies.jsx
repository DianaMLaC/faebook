import React, { useState } from "react"

const Movies = () => {
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
      case "movies":
        return <p> No Movies to show</p>
      default:
        return null
    }
  }

  return (
    <div className="movies-container">
      <header className="movies-header">
        <h4>Movies</h4>
        <div className="movies-header-more-button">...</div>
      </header>
      <nav className="movies-nav">
        <a
          href="#movies-teams"
          onClick={(e) => handleViewChange(e, "watched")}
          className={activeLink === "watched" ? "active" : ""}
        >
          Watched
        </a>
        <a
          href="#movies-liked"
          onClick={(e) => handleViewChange(e, "movies")}
          className={activeLink === "movies" ? "active" : ""}
        >
          Movies
        </a>
      </nav>
      <div className="no-info-to-show">{getViewComponent()}</div>
    </div>
  )
}

export default Movies
