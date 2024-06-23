import React, { useEffect } from "react"
import { useAuth } from "../../context/auth"
import { LiaJediOrder } from "react-icons/lia"
import { TbCircleTriangle } from "react-icons/tb"

function OrderAndElements(): React.ReactElement {
  const { profileUser } = useAuth()

  return (
    <div>
      <div>
        <h3> Order</h3>
        <div className="section">
          <div className="section-icon">
            <LiaJediOrder />
          </div>
          {profileUser?.intro && profileUser.intro.order ? (
            <div className="data-item">
              <div>{profileUser.intro.order}</div>
            </div>
          ) : (
            <div>No order to show</div>
          )}
        </div>
      </div>
      <div>
        <h3> Elements</h3>
        <div className="section">
          <div className="section-icon">
            <TbCircleTriangle />
          </div>

          {profileUser?.intro && profileUser.intro.elements ? (
            <div className="data-item">
              <div>{profileUser.intro.elements}</div>
            </div>
          ) : (
            <div>No order to show</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderAndElements
