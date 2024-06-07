import React, { useState } from "react"

const Books = () => {
  const [activeView, setActiveView] = useState("read")
  const [activeLink, setActiveLink] = useState("read")

  const handleViewChange = (e, view) => {
    e.preventDefault()
    setActiveView(view)
    setActiveLink(view)
  }

  const getViewComponent = () => {
    switch (activeView) {
      case "read":
        return <p> No read to show</p>
      case "books":
        return <p> No books to show</p>
      default:
        return null
    }
  }

  return (
    <div className="books-container">
      <header className="books-header">
        <h2>Books</h2>
        <div className="books-header-more-button">...</div>
      </header>
      <nav className="books-nav">
        <a
          href="#books-teams"
          onClick={(e) => handleViewChange(e, "read")}
          className={activeLink === "read" ? "active" : ""}
        >
          Read
        </a>
        <a
          href="#books-liked"
          onClick={(e) => handleViewChange(e, "books")}
          className={activeLink === "books" ? "active" : ""}
        >
          Books
        </a>
      </nav>
      <div className="no-info-to-show">{getViewComponent()}</div>
    </div>
  )
}

export default Books
