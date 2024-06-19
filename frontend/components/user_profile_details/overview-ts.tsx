import React, { useState } from "react"
import { HiBriefcase, HiHome, HiHeart } from "react-icons/hi2"
import { BsFillMortarboardFill } from "react-icons/bs"
import { CiCirclePlus } from "react-icons/ci"
import { useAuth } from "../../context/auth"
import { Intro } from "../../utils/types"
import { calculateZodiac } from "../../utils/helpers"

function Overview(): React.ReactElement {
  const { currentUser, setCurrentUser } = useAuth()
  const [education, setEducation] = useState(currentUser?.intro?.education || "")
  const [location, setLocation] = useState(currentUser?.intro?.location || "")
  const [house, setHouse] = useState(currentUser?.intro?.house || "")
  const [elements, setElements] = useState(currentUser?.intro?.elements || "")
  const [order, setOrder] = useState(currentUser?.intro?.order || "")
  const [zodiac, setZodiac] = useState(currentUser?.intro?.zodiac || "")

  if (currentUser) {
    const dob = currentUser.dateOfBirth
    setZodiac(calculateZodiac(dob))
  }

  const addIntroData = (field: keyof Intro) => {
    const renderCategory = () => {
      switch (field) {
        case "education":
          return (
            <input type="string" value={field} onChange={(e) => setEducation(e.target.value)} />
          )
        case "location":
          return (
            <input type="string" value={field} onChange={(e) => setEducation(e.target.value)} />
          )
        case "order":
          return (
            <input type="string" value={field} onChange={(e) => setEducation(e.target.value)} />
          )
        case "house":
          return (
            <select name={field}>
              <option value="" disabled>
                --Please choose an option--
              </option>
              <option value="Aer">Aer</option>
              <option value="Ignis">Ignis</option>
              <option value="Aqua">Aqua</option>
              <option value="Terra">Terra</option>
            </select>
          )
        case "elements":
          return (
            <input type="string" value={field} onChange={(e) => setEducation(e.target.value)} />
          )
        default:
          return <div>Select a category</div>
      }
    }
  }

  const dataMissing = (field: keyof Intro) => {
    return (
      <div className="data-missing" onClick={addIntroData(field)}>
        <div className="data-missing-icon">
          <CiCirclePlus />
        </div>
        <div>{`Add ${field}`}</div>
      </div>
    )
  }

  return <div className="overview"></div>
}

export default Overview
