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
    <section>
      Sign Up 
      <button type="button" onClick={() => isSignIn(true)}>Already have an account?</button>
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
        <input 
          type="text" 
          placeholder="confirm password"
          onChange={(e) => setConfirmPass(e.target.value)}  
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}