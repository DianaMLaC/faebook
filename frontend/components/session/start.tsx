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
      <div>
        <div className="faebook-title">
          <p>faebook</p>
        </div>
        <div className="faebook-motto">
          <p>Connect with friends and the world around you on Faebook.</p>
        </div>
      </div>
      <div className="login-container">
        <Login />
        <div className="separator"></div>
        <button className="signup-button" onClick={openModal}>
          Create new account
        </button>
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
