import React, { useState } from "react"
import Overview from "./overview"
import LocationAndEducation from "./location_and_education"
import House from "./house"
import ContactInfo from "./contact_info"
import FamilyAndRelationships from "./relationships"
import OrderAndElements from "./order_and_elements"
import FriendsPage from "../friends/friends_page"
import FriendsProvider from "../../context/friends"
import Photos from "../posts/photos"
const AboutMe = () => {
  const [activeCategory, setActiveCategory] = useState("Overview")

  const categories = [
    "Overview",
    "Location and education",
    "Contact and basic info",
    // "Family and relationships",
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
      // case "Family and relationships":
      //   return <FamilyAndRelationships />
      default:
        return <div>Select a category</div>
    }
  }
  return (
    <>
      <div className="about-me-container">
        {/* <div className="about-me-header">
        <h4>About</h4>
      </div> */}
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
      <div className="profile-photos-container">
        <Photos />
      </div>
    </>
  )
}

export default AboutMe
