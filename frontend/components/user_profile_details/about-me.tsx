import React, { useState } from "react"
import Overview from "./overview"
import LocationAndEducation from "./location-and-education"
import OrderAndElements from "./order-and-elements"
import House from "./house"
import ContactInfo from "./contact-info"
import FriendsPage from "../friends/friends_page"
import FriendsProvider from "../../context/friends"

function AboutMe(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState("Overview")

  const categories = [
    "Overview",
    "Location and education",
    "Contact and basic info",
    "Order and Elements",
    "House",
  ]

  const renderCategory = () => {
    switch (activeCategory) {
      case "Overview":
        return <Overview />
      case "Location and education":
        return <LocationAndEducation />
      case "Contact and basic info":
        return <ContactInfo />
      case "Order and Elements":
        return <OrderAndElements />
      case "House":
        return <House />
      default:
        return <div>Select a category</div>
    }
  }
  return (
    <>
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
      <div className="profile-friends-container">
        <FriendsProvider>
          <FriendsPage />
        </FriendsProvider>
      </div>
    </>
  )
}

export default AboutMe
