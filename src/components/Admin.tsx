import React from 'react'

import { UserAuth } from '../context/AuthContext'
import '../styles/app.scss'

export default function Admin() {
  const [ title, setTitle ] = React.useState('')
  const [ bio, setBio ] = React.useState('')
  const [ body, setBody ] = React.useState('')
  const { onAdd } = UserAuth() 

  return (
    <section>
      <a href={window.location.href + title}>{window.location.href + title}</a>
      <div>
        <input 
          type="text" 
          placeholder='title'
          onChange={(e) => setTitle(e.target.value)}  
        />
        <input 
          type="text" 
          placeholder='bio'
          onChange={(e) => setBio(e.target.value)}  
        />
        <input 
          type="text" 
          placeholder='body'
          onChange={(e) => setBody(e.target.value)}    
        />
      </div>
      <button type='button' onClick={() => onAdd(title, bio, body)}>Publish</button>
    </section>
  )
}