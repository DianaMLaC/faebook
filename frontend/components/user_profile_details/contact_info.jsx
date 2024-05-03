import React from "react"
import { useAuth } from "../../context/auth"
import { MdContactMail, MdOutlineCake } from "react-icons/md"
import { IoIosLink } from "react-icons/io"

const ContactInfo = () => {
  const { currentUser } = useAuth()
  return (
    <div>
      <div>
        <h4> Contact Info</h4>
        <div className="section">
          <MdContactMail className="icon" />
          {currentUser.email ? (
            <div className="data-item">
              <div>{currentUser.email}</div>
            </div>
          ) : (
            <div>No email to show</div>
          )}
        </div>
      </div>
      <div>
        <h4> Websites and social links</h4>
        <div className="section">
          <IoIosLink className="icon" />
          {currentUser.website ? (
            <div className="data-item">
              <div>{currentUser.website}</div>
            </div>
          ) : (
            <div>No websites to show</div>
          )}
        </div>
      </div>
      <div>
        <h4> Basic info</h4>
        <div className="section">
          <MdOutlineCake className="icon" />
          {currentUser.dateOfBirth ? (
            <div className="data-item">
              <div>{currentUser.dateOfBirth}</div>
            </div>
          ) : (
            <div>No info to show</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
