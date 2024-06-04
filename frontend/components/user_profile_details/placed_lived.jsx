import React from "react"
import { useAuth } from "../../context/auth"

const PlacesLived = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <h3>Places lived</h3>

      <div className="section">
        <img
          className="about-me-location-icon"
          src="assets/images/location.png"
          alt="location"
        ></img>
        {currentUser.location ? (
          <div className="data-item">
            <div>{currentUser.location}</div>
          </div>
        ) : (
          <div>No places to show</div>
        )}
      </div>
    </div>
  )
}

export default PlacesLived
