import React, { useState, FormEvent, ChangeEvent } from "react"
import { useAuth } from "../../context/auth"

function Signup(): React.ReactElement {
  const tenYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 14))
  const maxDate = tenYearsAgo.toISOString().split("T")[0]

  const { signup } = useAuth()
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<string>(maxDate)

  const [formErr, setFormErr] = useState<string>("")

  const clearForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setDateOfBirth("")
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      const userData = { firstName, lastName, password, dateOfBirth, email }
      console.log("form-user:", userData)
      await signup(userData)
      clearForm()
    } catch (err) {
      setFormErr((err as Error).message)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Sign Up</h1>
        <p>It's quick and easy.</p>
      </div>
      <div className="separator"></div>
      <div className="signup-form">
        <form>
          <div className="user-name">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <div className="dob">Birthday</div>
          <input
            type="date"
            value={dateOfBirth}
            max={maxDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}
          />

          {formErr && <p>{formErr}</p>}

          <button onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup