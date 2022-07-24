import { useState } from "react"
import { UserAuth } from "../context/AuthContext"

export default function SignUp({ isSignIn }) {
  const [ email, setEmail ] = useState('')
  const [ pass, setPass ] = useState('')
  const [ confirmPass, setConfirmPass ] = useState('')

  const { signUp } = UserAuth()

  function onSubmit(e) {
    e.preventDefault()
    
    if (pass === confirmPass) {
      signUp(email, pass)
    } else {
      console.log('Password doesnt match!')
    }
  }

  return (
    <section className="signup">
      <div className="signup__header">
        <div className="signup__header-logo"></div>
        <h1>Sign Up to continue</h1>
        <button type="button" onClick={() => isSignIn(true)}>Already have an account?</button>
      </div>
      <form onSubmit={onSubmit} className='signup__form'>
        <input 
          required  
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          required
          type="password" 
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Confirm password"
          onChange={(e) => setConfirmPass(e.target.value)}  
        />
        <button type="submit">Sign Up</button>
      </form>
    </section>
  )
}