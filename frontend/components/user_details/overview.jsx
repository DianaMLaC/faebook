import React from "react"
import { useAuth } from "../../context/auth"

const Overview = () => {
  const { currentUser } = useAuth()

  // currentUser.workplace
  //currentUser.education
  // currentUser.location
  //currentUser.relationship
  //currentUser.hometown
  //currentUser.phone

  return (
    <div>
      <div className="overview-child">
        <div>
          <div className="overview-icon">
            <img
              className="overview-work-icon"
              src={require("../../../app/assets/images/work.png").default}
              alt="work"
            ></img>
          </div>
          <div className="overview-info"></div>
        </div>
        <div>
          <div className="overview-visibility">
            <img
              className="nav-more-button"
              src={require("../../../app/assets/images/public-visibility.png").default}
              alt="More"
            ></img>
          </div>
          <div className="overview-more">
            <img
              className="nav-more-button"
              src={require("../../app/assets/images/more.png").default}
              alt="More"
            ></img>
          </div>
        </div>
      </div>
      <div className="overview-child">
        <div>
          <div className="overview-icon"></div>
          <div className="overview-info"></div>
        </div>
        <div>
          <div className="overview-visibility"></div>
          <div className="overview-more"></div>
        </div>
      </div>
      <div className="overview-child">
        <div>
          <div className="overview-icon"></div>
          <div className="overview-info"></div>
        </div>
        <div>
          <div className="overview-visibility"></div>
          <div className="overview-more"></div>
        </div>
      </div>
      <div className="overview-child">
        <div>
          <div className="overview-icon"></div>
          <div className="overview-info"></div>
        </div>
        <div>
          <div className="overview-visibility"></div>
          <div className="overview-more"></div>
        </div>
      </div>
    </div>
  )
}

export default Overview
