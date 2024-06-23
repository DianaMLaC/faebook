import React from "react"
import { useAuth } from "../../context/auth"
import { BsFillMortarboardFill } from "react-icons/bs"
import { IoLocationSharp } from "react-icons/io5"

function LocationAndEducation(): React.ReactElement {
  const { currentUser } = useAuth()

  return (
    <div>
      <div>
        <h3> Location </h3>
        <div className="section">
          <div className="section-icon">
            <IoLocationSharp />
          </div>
          {currentUser?.intro && currentUser.intro.location ? (
            <div className="data-item">
              <div>{currentUser.intro.location}</div>
            </div>
          ) : (
            <div className="data-item">No places to show</div>
          )}
        </div>
      </div>
      <div>
        <h3> Education </h3>
        <div className="section">
          <div className="section-icon">
            <BsFillMortarboardFill />
          </div>
          {currentUser?.intro && currentUser.intro.education ? (
            <div className="data-item">
              <div>{currentUser.intro.education}</div>
            </div>
          ) : (
            <div>No Academy to show</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationAndEducation
