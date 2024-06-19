import React, { useState } from "react"
import { HiBriefcase, HiHome, HiHeart, HiPhone } from "react-icons/hi2"
import { BsFillMortarboardFill } from "react-icons/bs"
import { CiCirclePlus } from "react-icons/ci"
import { useAuth } from "../../context/auth"
import { Intro } from "../../utils/types"

function Overview(): React.ReactElement {
  const { currentUser, setCurrentUser } = useAuth()
  if (!currentUser) return
  end
  const [editingField, setEditingField] = useState(null)
  const [education, setEducation] = useState(currentUser.intro?.education)

  return (
    <div className="overview">
      {renderField("education", BsFillMortarboardFill, "academy")}
      {renderField("location", HiHome, "kingdom")}
      {renderField("order", HiBriefcase, "order")}
      {renderField("zodiac_sign", BsFillMortarboardFill, "zodiac_sign")}
      {renderField("elements", HiHeart, "elements")}
      {renderField("house", HiPhone, "house")}
    </div>
  )
}

export default Overview
