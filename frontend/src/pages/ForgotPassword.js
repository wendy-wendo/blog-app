import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { Alert } from "react-bootstrap"

export default function Signup() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions.")
    } catch(e) {
      setError("Failed to reset password: " + e.message)
    }
  }

  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            {error && <Alert variant='danger'>{error}</Alert>}
            { message && <Alert variant='success'>{message}</Alert> }
            <h2>Forgot Password?</h2>
            <label htmlFor='email'>Email:</label>
            <input 
              id='title'
              type="email" 
              placeholder='Email'
              ref={emailRef}
            />

            <button type='submit'>Reset Password</button>
        </form>
        <Link to="/login">Cancel</Link>
      </div>
      
    </main>
  )
}
