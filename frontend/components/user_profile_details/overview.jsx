import React, { useState } from "react"
import { HiBriefcase, HiHome, HiHeart, HiPhone } from "react-icons/hi2"
import { BsFillMortarboardFill } from "react-icons/bs"
import { CiCirclePlus } from "react-icons/ci"
import { useAuth } from "../../context/auth"
import { createIntro } from "../../utils/profile"

const Overview = () => {
  const { currentUser, setCurrentUser } = useAuth()
  const [editingField, setEditingField] = useState(null)
  const [formData, setFormData] = useState({
    work: "",
    education: "",
    location: "",
    relationship: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = async (field) => {
    try {
      const introData = await createIntro(currentUser.id, { [field]: formData[field] })
      setCurrentUser((prevUser) => ({
        ...prevUser,
        [field]: introData.intro[field],
      }))
      setEditingField(null)
    } catch (err) {
      console.error("Error saving intro:", err)
    }
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  const renderField = (field, Icon, label) => {
    return (
      <div className="section" key={field}>
        {editingField === field ? (
          <div className="form">
            <input type="text" name={field} value={formData[field]} onChange={handleInputChange} />
            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={() => handleSave(field)}>Save</button>
            </div>
          </div>
        ) : currentUser[field] ? (
          <div className="data-item">
            <Icon className="icon" />
            <div>{currentUser[field]}</div>
          </div>
        ) : (
          <div className="data-missing" onClick={() => setEditingField(field)}>
            <div className="data-missing-icon">
              <CiCirclePlus />
            </div>
            <div>{`Add ${label}`}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="overview">
      {renderField("work", HiBriefcase, "workplace")}
      {renderField("highSchool", BsFillMortarboardFill, "high school")}
      {renderField("education", BsFillMortarboardFill, "college")}
      {renderField("location", HiHome, "current city")}
      {renderField("relationship", HiHeart, "relationship status")}
      {renderField("phone", HiPhone, "contact details")}
    </div>
  )

  // return (
  //   <div className="overview">
  //     <div className="section">
  //       {currentUser.work ? (
  //         <div className="data-item">
  //           <HiBriefcase className="icon" />
  //           <div>{currentUser.work}</div>
  //         </div>
  //       ) : (
  //         <div className="data-missing">
  //           <div className="data-missing-icon">
  //             <CiCirclePlus />
  //           </div>
  //           <div>Add a workplace</div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="section">
  //       {currentUser.highSchool ? (
  //         <div className="data-item">
  //           <sFillMortarboardFill className="icon" />
  //           <div>{currentUser.highSchool}</div>
  //         </div>
  //       ) : (
  //         <div className="data-missing">
  //           <div className="data-missing-icon">
  //             <CiCirclePlus />
  //           </div>
  //           <div>Add high school</div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="section">
  //       {currentUser.education ? (
  //         <div className="data-item">
  //           <BsFillMortarboardFill className="icon" />
  //           <div>{currentUser.education}</div>
  //         </div>
  //       ) : (
  //         <div className="data-missing">
  //           <div className="data-missing-icon">
  //             <CiCirclePlus />
  //           </div>
  //           <div>Add college</div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="section">
  //       {currentUser.location ? (
  //         <div className="data-item">
  //           <HiHome className="icon" />
  //           <div>{currentUser.location}</div>
  //         </div>
  //       ) : (
  //         <div className="data-missing">
  //           <div className="data-missing-icon">
  //             <CiCirclePlus />
  //           </div>
  //           <div>Add current city</div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="section">
  //       {currentUser.location ? (
  //         <div className="data-item">
  //           <HiHome className="icon" />
  //           <div>{currentUser.location}</div>
  //         </div>
  //       ) : (
  //         <div className="data-missing">
  //           <div className="data-missing-icon">
  //             <CiCirclePlus />
  //           </div>
  //           <div>Add hometown</div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="section">
  //       {currentUser.relationship ? (
  //         <div className="data-item">
  //           <HiHeart className="icon" />
  //           <div>{currentUser.relationship}</div>
  //         </div>
  //       ) : (
  //         <div className="data-missing">
  //           <div className="data-missing-icon">
  //             <CiCirclePlus />
  //           </div>
  //           <div>Add relationship status</div>
  //         </div>
  //       )}
  //     </div>

  //     <div className="section">
  //       {currentUser.phone ? (
  //         <div className="data-item">
  //           <HiPhone className="icon" />
  //           <div>{currentUser.phone}</div>
  //         </div>
  //       ) : (
  //         <div className="data-missing">
  //           <div className="data-missing-icon">
  //             <CiCirclePlus />
  //           </div>
  //           <div>Add contact details</div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
}

export default Overview
