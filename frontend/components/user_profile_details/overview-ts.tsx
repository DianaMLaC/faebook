import React, { useState, useEffect } from "react"
import { HiHome } from "react-icons/hi2"
import { BsFillMortarboardFill } from "react-icons/bs"
import { CiCirclePlus } from "react-icons/ci"
import { TbCircleTriangle } from "react-icons/tb"
import { FaJediOrder } from "react-icons/fa"
import { IoLocationSharp } from "react-icons/io5"
import { useAuth } from "../../context/auth"
import { Intro } from "../../utils/types"
import { calculateZodiac } from "../../utils/helpers"
import { updateIntro } from "../../utils/profile"

function Overview(): React.ReactElement {
  const { currentUser, setCurrentUser } = useAuth()
  const [education, setEducation] = useState(currentUser?.intro?.education || "")
  const [location, setLocation] = useState(currentUser?.intro?.location || "")
  const [house, setHouse] = useState(currentUser?.intro?.house || "")
  const [elements, setElements] = useState(currentUser?.intro?.elements || "")
  const [order, setOrder] = useState(currentUser?.intro?.order || "")
  const [zodiac, setZodiac] = useState(currentUser?.intro?.zodiac || "")
  const [editingField, setEditingField] = useState<string | null>(null)

  useEffect(() => {
    if (currentUser) {
      console.log({ currentUser })
      const dob = currentUser.dateOfBirth
      setZodiac(calculateZodiac(dob))
    }
  }, [currentUser])

  const renderFieldInput = (field: keyof Intro) => {
    switch (field) {
      case "education":
        return (
          <input
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Type your education"
          />
        )
      case "location":
        return (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Type your location"
          />
        )
      case "order":
        return (
          <input
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="Type your oder"
          />
        )
      case "elements":
        return (
          <input
            type="text"
            value={elements}
            onChange={(e) => setElements(e.target.value)}
            placeholder="Type your elements"
          />
        )
      case "house":
        return (
          <select
            className="house-input"
            name={field}
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          >
            <option value="" disabled>
              --Please choose an option--
            </option>
            <option value="Aer">Aer</option>
            <option value="Ignis">Ignis</option>
            <option value="Aqua">Aqua</option>
            <option value="Terra">Terra</option>
          </select>
        )
      default:
        return <div>Select a category</div>
    }
  }

  const dataMissing = (field: keyof Intro) => {
    return (
      <div className="data-missing" onClick={() => setEditingField(field)}>
        <div className="data-missing-icon">
          <CiCirclePlus />
        </div>
        <div>{`Add ${field}`}</div>
      </div>
    )
  }

  const icon = (field: keyof Intro) => {
    switch (field) {
      case "education":
        return <BsFillMortarboardFill />
      case "location":
        return <IoLocationSharp />
      case "order":
        return <FaJediOrder />
      case "elements":
        return <TbCircleTriangle />
      case "house":
        return <HiHome />
      default:
        return <div></div>
    }
  }

  const dataPresent = (field: keyof Intro) => {
    return (
      <div className="data-present">
        <div className="data-present-icon">{icon(field)}</div>
        <div>{currentUser?.intro?.[field]}</div>
      </div>
    )
  }

  const handleSave = async () => {
    const updatedIntro: Partial<Intro> = {}
    if (editingField === "education" && education !== currentUser?.intro?.education) {
      updatedIntro.education = education
    }
    if (editingField === "location" && location !== currentUser?.intro?.location) {
      updatedIntro.location = location
    }
    if (editingField === "order" && order !== currentUser?.intro?.order) {
      updatedIntro.order = order
    }
    if (editingField === "elements" && elements !== currentUser?.intro?.elements) {
      updatedIntro.elements = elements
    }
    if (editingField === "house" && house !== currentUser?.intro?.house) {
      updatedIntro.house = house
    }

    if (Object.keys(updatedIntro).length > 0) {
      if (!currentUser || !currentUser.intro?.id) {
        console.error("Cannot update intro data as currentUser or intro id is missing")
        return
      }
      try {
        const updatedData = await updateIntro(currentUser.id, currentUser.intro.id, updatedIntro)
        setCurrentUser({
          ...currentUser,
          intro: {
            ...currentUser.intro,
            ...updatedData,
          },
        })
        if (updatedData.education) setEducation(updatedData.education)
        if (updatedData.location) setLocation(updatedData.location)
        if (updatedData.order) setOrder(updatedData.order)
        if (updatedData.elements) setElements(updatedData.elements)
        if (updatedData.house) setHouse(updatedData.house)
        setEditingField(null)
      } catch (err) {
        console.error("Error updating intro:", err.message)
      }
    }
  }

  return (
    <div className="overview">
      <div className="education">
        {currentUser?.intro?.education
          ? dataPresent("education")
          : editingField === "education"
          ? renderFieldInput("education")
          : dataMissing("education")}
      </div>
      <div className="location">
        {currentUser?.intro?.location
          ? dataPresent("location")
          : editingField === "location"
          ? renderFieldInput("location")
          : dataMissing("location")}
      </div>
      <div className="order">
        {currentUser?.intro?.order
          ? dataPresent("order")
          : editingField === "order"
          ? renderFieldInput("order")
          : dataMissing("order")}
      </div>
      <div className="elements">
        {currentUser?.intro?.elements
          ? dataPresent("elements")
          : editingField === "elements"
          ? renderFieldInput("elements")
          : dataMissing("elements")}
      </div>
      <div className="house">
        {currentUser?.intro?.house
          ? dataPresent("house")
          : editingField === "house"
          ? renderFieldInput("house")
          : dataMissing("house")}
      </div>
      {editingField && <button onClick={handleSave}>Save</button>}
    </div>
  )
}

export default Overview
