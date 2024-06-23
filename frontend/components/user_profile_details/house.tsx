import React from "react"
import { useAuth } from "../../context/auth"
import { HiHome } from "react-icons/hi"

function House(): React.ReactElement {
  const { profileUser } = useAuth()

  return (
    <div>
      <h3>House</h3>

      <div className="section">
        <div className="section-icon">
          <HiHome />
        </div>
        {profileUser?.intro && profileUser.intro.house ? (
          <div className="data-item">
            <div>{profileUser.intro.house}</div>
          </div>
        ) : (
          <div className="data-item">No house to show</div>
        )}
      </div>
    </div>
  )
}

export default House
