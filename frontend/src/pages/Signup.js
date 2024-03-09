import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { Alert } from "react-bootstrap"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match!")
    }

    try {
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch(e) {
      setError("Failed to create account: " + e.message)
    }
  }

  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            { error && <Alert variant='danger'>{error}</Alert> }
            <h2>Sign Up</h2>
            <label htmlFor='email'>Email:</label>
            <input 
              id='title'
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

            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input 
              id='confirmPassword'
              type="password"
              ref={passwordConfirmRef} 
            />

            <button type='submit'>Sign Up</button>
        </form>
        <p>Have an account? <Link to="/login">Log In</Link></p>
      </div>
      
    </main>
  )
}
