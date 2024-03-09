import React, { useState, useRef } from 'react'
import "./NewBlog/NewBlog.css"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Alert } from "react-bootstrap"

export default function Login() {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const emailRef = useRef()
  const passwordRef = useRef()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch(e) {
      return setError("Failed to login account:" + e.message)
    }
  }

  return (
    <main>
      <div className="form-container">
        { error && <Alert variant='danger'>{error}</Alert>}
        <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <label htmlFor='title'>Email:</label>
            <input 
              id='email'
              type="email" 
              placeholder='Email'
              ref={emailRef}
            />

            <label htmlFor='password'>Password:</label>
            <input 
              id='password'
              type="password" 
              ref={passwordRef}
            />

            <button type='submit'>Log In</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </main>
  )
}
