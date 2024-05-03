import React from "react"
import { useAuth } from "../../context/auth"
import { HiHeart } from "react-icons/hi2"
import { GiFamilyTree } from "react-icons/gi"

const FamilyAndRelationships = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <h3> Relationship </h3>
      <div className="section">
        <HiHeart className="icon" />
        {currentUser.relationship ? (
          <div className="data-item">
            <div>{currentUser.relationship}</div>
          </div>
        ) : (
          <div>No relationship status to show</div>
        )}
      </div>
      <h3> Family Members </h3>
      <div className="section">
        <GiFamilyTree className="icon" />
        {currentUser.family ? (
          <div className="data-item">
            <div>{currentUser.family}</div>
          </div>
        ) : (
          <div>No family members to show</div>
        )}
      </div>
    </div>
  )
}

export default FamilyAndRelationships
