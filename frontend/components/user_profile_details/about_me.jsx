import React, { useState } from "react"
import Overview from "./overview"
import WorkAndEducation from "./work_and_education"
const AboutMe = () => {
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
        return <Overview />
      case "Work and education":
        return <WorkAndEducation />
      case "Contact and basic info":
        return <ContactInfo />
      case "Life events":
        return <LifeEvents />
      case "Places lived":
        return <PlacesLived />
      case "Family and relationships":
        return <FamilyAndRelationships />
      case "Details about you":
        return <DetailsAboutYou />
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
