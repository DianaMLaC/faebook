import React from "react"
import { useAuth } from "../../context/auth"
import { HiBriefcase } from "react-icons/hi2"
import { BsFillMortarboardFill } from "react-icons/bs"

const WorkAndEducation = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <div>
        <h3> Work </h3>
        <div className="section">
          <HiBriefcase className="icon" />
          {currentUser.work ? (
            <div className="data-item">
              <p>{currentUser.work}</p>
            </div>
          ) : (
            <div>No workplaces to show</div>
          )}
        </div>
      </div>
      <div>
        <h3> University </h3>
        <div className="section">
          <BsFillMortarboardFill className="icon" />
          {currentUser.education ? (
            <div className="data-item">
              <p>{currentUser.education}</p>
            </div>
          ) : (
            <div>No University to show</div>
          )}
        </div>
      </div>
      <div>
        <h3> High School </h3>
        <div className="section">
          <BsFillMortarboardFill className="icon" />
          {currentUser.education ? (
            <div className="data-item">
              <p>{currentUser.education}</p>
            </div>
          ) : (
            <div>No High School to show</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkAndEducation
