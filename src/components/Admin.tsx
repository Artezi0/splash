import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import '../styles/app.scss'

export default function Admin() {
  const { user, logout, onUpdate, getActive } = UserAuth()
  const [ link, setLink ] = useState(undefined)

  function onEdit(field, value) {
    onUpdate({
      ...getActive(),
      [field]: value,
      lastModified: Date.now()
    })
  }

  function onPublish() {
    setLink('http://localhost:3000/' + getActive().id)
  }

  if (user) {
    return (
      <section>
        <div>
          <p>{user.email}</p>
          <button type='button' onClick={logout}>Log out</button>
        </div>
        {getActive() ? 
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {link && <a href={link}>Link to site</a>}
          <input 
            type="text" 
            placeholder='title'
            value={getActive().title}
            onChange={(e) => onEdit('title', e.target.value)}  
          />
          <input 
            type="text" 
            placeholder='bio'
            value={getActive().bio}            
            onChange={(e) => onEdit('bio', e.target.value)}  
          />
          <input 
            type="text" 
            placeholder='body'
            value={getActive().body}
            onChange={(e) => onEdit('body', e.target.value)}  
          />
          <button type='button' onClick={onPublish}>Publish</button>
        </div> : <p>Loading...</p>
        }
      </section>
    )
  }
}