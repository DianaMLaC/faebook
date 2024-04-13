import React, { useState } from "react"
import { useAuth } from "../../context/auth"

const Login = () => {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErr, setFormErr] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = { email, password }
      await login(formData)
    } catch (err) {
      setPassword("")
      setEmail("")

      setFormErr(err.message)
    }
  }
  return (
    <div className="login-form">
      <form>
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

        {formErr && <p>{formErr}</p>}

        <button onClick={handleSubmit}>Log In</button>
      </form>
    </div>
  )
}

export default Login
