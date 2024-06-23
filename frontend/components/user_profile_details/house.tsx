import React from "react"
import { useAuth } from "../../context/auth"
import { HiHome } from "react-icons/hi"

function House(): React.ReactElement {
  const { currentUser } = useAuth()

  return (
    <div>
      <h3>House</h3>

      <div className="section">
        <div className="section-icon">
          <HiHome />
        </div>
        {currentUser?.intro && currentUser.intro.house ? (
          <div className="data-item">
            <div>{currentUser.intro.house}</div>
          </div>
        ) : (
          <div className="data-item">No house to show</div>
        )}
      </div>
    </div>
  )
}

export default House
