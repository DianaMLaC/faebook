import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import Overview from "./overview"

const AboutMe = () => {
  const { currentUser } = useAuth()
  const [activeCategory, setActiveCategory] = useState("Overview")

  const categories = [
    "Overview",
    "Work and education",
    "Places lived",
    "Contact and basic info",
    "Family and relationships",
    "Details about you",
    "Life events",
  ]

  const renderCategory = () => {
    switch (activeCategory) {
      case "Overview":
        return <Overview userData={currentUser} />
      case "Work and education":
        return <WorkAndEducation userData={currentUser} />
      case "Contact and basic info":
        return <ContactInfo userData={currentUser} />
      case "Life events":
        return <LifeEvents userData={currentUser} />
      case "Places lived":
        return <PlacesLived userData={currentUser} />
      case "Family and relationships":
        return <FamilyAndRelationships userData={currentUser} />
      case "Details about you":
        return <DetailsAboutYou userData={currentUser} />
      default:
        return <div>Select a category</div>
    }
  }
  return (
    <div className="about-me-container">
      <nav className="about-me-nav">
        <div className="about-me-title">About</div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </nav>
      <div className="about-me-content">{renderCategory()}</div>
    </div>
  )
}

export default AboutMe
