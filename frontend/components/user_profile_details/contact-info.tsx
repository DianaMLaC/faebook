import React from "react"
import { useAuth } from "../../context/auth"
import { MdEmail, MdOutlineCake } from "react-icons/md"
import { GiMagicSwirl } from "react-icons/gi"

function ContactInfo(): React.ReactElement {
  const { profileUser } = useAuth()
  return (
    <div>
      <div>
        <h3> Contact Info</h3>
        <div className="section">
          <div className="about-me-location-icon">
            <MdEmail />
          </div>

          {profileUser?.email ? (
            <div className="data-item">
              <div>{profileUser.email}</div>
            </div>
          ) : (
            <div>No email to show</div>
          )}
        </div>
      </div>

      <div>
        <h3> Date Of Birth</h3>
        <div className="section">
          <div className="about-me-location-icon">
            <MdOutlineCake />
          </div>

          {profileUser?.dateOfBirth ? (
            <div className="data-item">
              <div>{profileUser.dateOfBirth}</div>
            </div>
          ) : (
            <div>No info to show</div>
          )}
        </div>
      </div>

      <div>
        <h3> Zodiac Sign</h3>
        <div className="section">
          <div className="section-icon">
            <GiMagicSwirl />
            {/* to put the zodiac sign icon according to the zodiac sign of the user*/}
          </div>

          {profileUser?.intro && profileUser.intro.zodiac ? (
            <div className="data-item">
              <div>{profileUser.intro.zodiac}</div>
            </div>
          ) : (
            <div>No zodiac sign to show</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactInfo