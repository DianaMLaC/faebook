import React, { useState, FormEvent, ChangeEvent } from "react"
import { useAuth } from "../../context/auth"

function Login(): React.ReactElement {
  const { login } = useAuth()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [formErr, setFormErr] = useState<string>("")

  const handleSubmit = async (e: FormEvent): Promise<void> => {
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        {formErr && <div className="form-errors">{formErr}</div>}

        <button onClick={handleSubmit}>Log In</button>
      </form>
    </div>
  )
}

export default Login
