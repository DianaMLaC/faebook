import React from "react"
import { AiOutlinePlus, AiFillEye, AiOutlineEllipsis } from "react-icons/ai"

const Overview = ({ userData }) => {
  return (
    <div className="overview">
      <div className="section">
        <h3>Work</h3>
        {userData.work ? (
          <div className="data-item">
            <AiFillEye className="icon" />
            <p>{userData.work}</p>
            <AiOutlineEllipsis className="more-icon" />
          </div>
        ) : (
          <button className="add-button">
            <AiOutlinePlus /> Add workplace
          </button>
        )}
      </div>

      <div className="section">
        <h3>Education</h3>
        {userData.education ? (
          <div className="data-item">
            <AiFillEye className="icon" />
            <p>{userData.education}</p>
            <AiOutlineEllipsis className="more-icon" />
          </div>
        ) : (
          <button className="add-button">
            <AiOutlinePlus /> Add education
          </button>
        )}
      </div>

      <div className="section">
        <h3>Location</h3>
        {userData.location ? (
          <div className="data-item">
            <AiFillEye className="icon" />
            <p>{userData.location}</p>
            <AiOutlineEllipsis className="more-icon" />
          </div>
        ) : (
          <button className="add-button">
            <AiOutlinePlus /> Add hometown
          </button>
        )}
      </div>

      <div className="section">
        <h3>Relationship Status</h3>
        {userData.relationship ? (
          <div className="data-item">
            <AiFillEye className="icon" />
            <p>{userData.relationship}</p>
            <AiOutlineEllipsis className="more-icon" />
          </div>
        ) : (
          <button className="add-button">
            <AiOutlinePlus /> Add relationship status
          </button>
        )}
      </div>

      <div className="section">
        <h3>Contact</h3>
        {userData.phone ? (
          <div className="data-item">
            <AiFillEye className="icon" />
            <p>{userData.phone}</p>
            <AiOutlineEllipsis className="more-icon" />
          </div>
        ) : (
          <button className="add-button">
            <AiOutlinePlus /> Add phone
          </button>
        )}
      </div>
    </div>
  )
}

export default Overview
