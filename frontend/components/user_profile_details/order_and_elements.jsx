import React from "react"
import { useAuth } from "../../context/auth"
import { LiaJediOrder } from "react-icons/lia"
import { GiMagicSwirl } from "react-icons/gi"

const OrderAndElements = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <div>
        <h3> Order</h3>
        <div className="section">
          <div className="about-me-location-icon">
            <LiaJediOrder />
          </div>
          {currentUser.intro && currentUser.intro.order ? (
            <div className="data-item">
              <div>{currentUser.intro.order}</div>
            </div>
          ) : (
            <div>No order to show</div>
          )}
        </div>
      </div>
      <div>
        <h3> Elements</h3>
        <div className="section">
          <div className="about-me-location-icon">
            <GiMagicSwirl />
          </div>

          {currentUser.intro && currentUser.intro.elements ? (
            <div className="data-item">
              <div>{currentUser.intro.elements}</div>
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
