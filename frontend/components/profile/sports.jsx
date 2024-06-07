import React, { useState } from "react"

const Sports = () => {
  const [activeView, setActiveView] = useState("teams")
  const [activeLink, setActiveLink] = useState("teams")

  const handleViewChange = (e, view) => {
    e.preventDefault()
    setActiveView(view)
    setActiveLink(view)
  }

  const getViewComponent = () => {
    switch (activeView) {
      case "teams":
        return <p> No sports teams to show</p>
      case "athletes":
        return <p> No athletes to show</p>
      default:
        return null
    }
  }

  return (
    <div className="sports-container">
      <header className="sports-header">
        <h2>Sports</h2>
        <div className="sports-header-more-button">...</div>
      </header>
      <nav className="sports-nav">
        <a
          href="#sports-teams"
          onClick={(e) => handleViewChange(e, "teams")}
          className={activeLink === "teams" ? "active" : ""}
        >
          Sports Teams
        </a>
        <a
          href="#sports-athletes"
          onClick={(e) => handleViewChange(e, "athletes")}
          className={activeLink === "athletes" ? "active" : ""}
        >
          Athletes
        </a>
      </nav>
      <div className="no-info-to-show">{getViewComponent()}</div>
    </div>
  )
}

export default Sports
