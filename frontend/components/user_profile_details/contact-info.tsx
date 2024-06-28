import React from "react"
import { useAuth } from "../../context/auth"
import { MdEmail, MdOutlineCake } from "react-icons/md"
import {
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
  TbZodiacAquarius,
  TbZodiacPisces,
} from "react-icons/tb"

function ContactInfo(): React.ReactElement {
  const { profileUser } = useAuth()

  const getZodiacIcon = (zodiacSign: string): React.ReactElement | null => {
    switch (zodiacSign.toLowerCase()) {
      case "aries":
        return <TbZodiacAries />
      case "taurus":
        return <TbZodiacTaurus />
      case "gemini":
        return <TbZodiacGemini />
      case "cancer":
        return <TbZodiacCancer />
      case "leo":
        return <TbZodiacLeo />
      case "virgo":
        return <TbZodiacVirgo />
      case "libra":
        return <TbZodiacLibra />
      case "scorpio":
        return <TbZodiacScorpio />
      case "sagittarius":
        return <TbZodiacSagittarius />
      case "capricorn":
        return <TbZodiacCapricorn />
      case "aquarius":
        return <TbZodiacAquarius />
      case "pisces":
        return <TbZodiacPisces />
      default:
        return null
    }
  }

  return (
    <div>
      <div>
        <h3> Contact Info</h3>
        <div className="section">
          <div className="section-icon">
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
          <div className="section-icon">
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
          <div className="section-icon">{getZodiacIcon(profileUser?.intro!.zodiac!)}</div>

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
