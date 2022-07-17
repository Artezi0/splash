import { useState } from "react"
import { UserAuth } from "../context/AuthContext"

export default function SignIn({ isSignIn }) {
  const [ email, setEmail ] = useState('')
  const [ pass, setPass ] = useState('')

  const { signIn } = UserAuth()

  function onSubmit(e) {
    e.preventDefault()
    
    signIn(email, pass)
  }

  return (
    <section>
      Sign In
      <button type="button" onClick={() => isSignIn(false)}>Don't have an account?</button>
      <form onSubmit={onSubmit}>
        <input 
          required  
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          required
          type="password" 
          placeholder="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}