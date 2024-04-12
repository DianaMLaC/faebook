import React, { useState } from "react"
import { useAuth } from "../../context/auth"

const Signup = () => {
  const { signup } = useAuth
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  const [formErr, setFormErr] = useState("")

  const clearForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setDateOfBirth("")
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = { firstName, lastName, email, password, dateOfBirth }
      await signup(userData)
    } catch (err) {
      clearForm()
      setFormErr(err.message)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1> Sign Up</h1>
        <p> It's quick and easy.</p>
      </div>
      <div className="signup-form">
        <form>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

          {formErr && <p>{formErr}</p>}

          <button onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
