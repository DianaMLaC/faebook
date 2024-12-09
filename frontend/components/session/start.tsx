import React, { useState, useEffect } from "react"
import Login from "./login"
import Signup from "./signup"
import ReactModal from "react-modal"

function StartPage(): React.ReactElement {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const openModal = (): void => {
    setModalIsOpen(true)
  }

  const closeModal = (): void => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    ReactModal.setAppElement(".start-page")
  }, [])

  return (
    <div className="start-page">
      <div className="start-page-items">
        <div className="faebook-welcome">
          <div className="faebook-title">
            <p>faebook</p>
          </div>
          <div className="faebook-motto">
            <p>Connect with fae students from Zodiac Academy and Solaria world on Faebook.</p>
          </div>
        </div>
        <div className="login-container">
          <Login />
          <div className="separator"></div>
          <button className="signup-button" onClick={openModal}>
            Create new account
          </button>
        </div>
      </div>
      <div className="footer">
        <p>
          This project is a fan-made work and is not affiliated with or endorsed by Facebook or the
          authors of Zodiac Academy.
        </p>
        <p>
          All rights to the Facebook design belong to Meta Platforms, Inc., and all rights to Zodiac
          Academy content belong to Caroline Peckham and Susanne Valenti.{" "}
        </p>
        <p>This project is for educational and personal use only. No commercial use is intended.</p>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Sign Up"
        className="Modal"
      >
        <Signup />
        <button onClick={closeModal} className="close-modal-button">
          x
        </button>
      </ReactModal>
    </div>
  )
}

export default StartPage
