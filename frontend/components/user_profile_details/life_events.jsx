import React from "react"
import { useAuth } from "../../context/auth"
import { MdOutlineStarBorder } from "react-icons/md"

const LifeEvents = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <h3> Life Events </h3>
      <div className="section">
        <MdOutlineStarBorder className="icon" />
        {currentUser.events ? (
          <div className="data-item">
            <div>{currentUser.events}</div>
          </div>
        ) : (
          <div>No life events to show</div>
        )}
      </div>
    </div>
  )
}

export default LifeEvents
