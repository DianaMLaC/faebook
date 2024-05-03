import React from "react"
import { HiBriefcase, HiHome, HiHeart, HiPhone } from "react-icons/hi2"
import { BsFillMortarboardFill } from "react-icons/bs"
import { CiCirclePlus } from "react-icons/ci"
import { useAuth } from "../../context/auth"

const Overview = () => {
  const { currentUser } = useAuth()

  return (
    <div className="overview">
      <div className="section">
        {currentUser.work ? (
          <div className="data-item">
            <HiBriefcase className="icon" />
            <div>{currentUser.work}</div>
          </div>
        ) : (
          <div className="data-missing">
            <div className="data-missing-icon">
              <CiCirclePlus />
            </div>
            <div>Add workplace</div>
          </div>
        )}
      </div>

      <div className="section">
        {currentUser.education ? (
          <div className="data-item">
            <BsFillMortarboardFill className="icon" />
            <div>{currentUser.education}</div>
          </div>
        ) : (
          <div className="data-missing">
            <div className="data-missing-icon">
              <CiCirclePlus />
            </div>
            <div>Add Education</div>
          </div>
        )}
      </div>

      <div className="section">
        {currentUser.location ? (
          <div className="data-item">
            <HiHome className="icon" />
            <div>{currentUser.location}</div>
          </div>
        ) : (
          <div className="data-missing">
            <div className="data-missing-icon">
              <CiCirclePlus />
            </div>
            <div>Add hometown</div>
          </div>
        )}
      </div>

      <div className="section">
        {currentUser.relationship ? (
          <div className="data-item">
            <HiHeart className="icon" />
            <div>{currentUser.relationship}</div>
          </div>
        ) : (
          <div className="data-missing">
            <div className="data-missing-icon">
              <CiCirclePlus />
            </div>
            <div>Add relationship status</div>
          </div>
        )}
      </div>

      <div className="section">
        {currentUser.phone ? (
          <div className="data-item">
            <HiPhone className="icon" />
            <div>{currentUser.phone}</div>
          </div>
        ) : (
          <div className="data-missing">
            <div className="data-missing-icon">
              <CiCirclePlus />
            </div>
            <div>Add contact details</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Overview
