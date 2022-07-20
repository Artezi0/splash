import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import '../styles/app.scss'

export default function Admin() {
  const [ userModule, setUserModule ] = useState(false)
  const [ userEdit, setUserEdit ] = useState(false)

  const { user, logout, onUpdate, getActive } = UserAuth()
  const [ link, setLink ] = useState(undefined)

  function onEdit(field, value) {
    onUpdate({
      ...getActive(),
      [field]: value,
      lastModified: Date.now()
    })
  }

  if (user) {
    return (
      <section className='admin'>
        {getActive() ? 
        <div className='admin__main'>
          {userModule && 
          <div className='admin__main-config'>
            User Config
          </div>
          }
          <div className='admin__main-topbar'>
            <div className='topbar__menu'>
              <div className='topbar__menu-logo'>
                <div className='logo'></div>
                <h1>Splash</h1>
              </div>
              <li>Appereance</li>
              <li>Settings</li>
              <a href={'http://localhost:3000/' + getActive().id}>Site Link</a>
            </div>

            <div className='topbar__account'>
              <img src={user.photoURL ? user.photoURL : 'https://st3.depositphotos.com/7486768/17806/v/450/depositphotos_178065822-stock-illustration-profile-anonymous-face-icon-gray.jpg'} 
                onClick={() => setUserModule(!userModule)}
                width={30}
              />
              <button type='button'>Publish</button>
            </div>   
          </div>

          {/* <input 
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
          /> */}
        </div> : 
        <p className='admin__load'>Loading...</p>
        }
      </section>
    )
  }
}