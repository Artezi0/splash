import { useRef, useState, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import '../styles/app.scss'

export default function Admin() {
  const { user, logout, onUpdate, getActive } = UserAuth()
  const [ userModule, setUserModule ] = useState(false)
  const ref = useRef(null)

  function onEdit(field, value) {
    onUpdate({
      ...getActive(),
      [field]: value,
    })
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setUserModule(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }, [ref])
  }

  useOutsideAlerter(ref)

  const Cover = () => {
    function handleColor() {
      let hexColor = '#'
      const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
      const randomHex = () => { return Math.floor(Math.random() * hex.length)}    
      
      for (let i = 0; i < 6; i++) {
        hexColor += hex[randomHex()]
      }

      onUpdate({
        ...getActive(), 
        cover: {
          isCover: true,
          value: hexColor.toString()
        },
      })
    }

    return (
      <div className='edit__cover' style={{ background: getActive().cover.value }}>
        <button type='button' onClick={() => onUpdate({...getActive(),cover: {isCover: false, value: getActive().cover.value}})}>Remove</button>
        <button type='button' onClick={handleColor}>Randomize</button>
      </div>
    )
  }

  if (user) {
    return (
      <section className='admin'>
        {getActive() ? 
        <div className='admin__main'>
          {userModule && 
          <div className='admin__main-config'>
            <div className="config__container" ref={ref}>
              <div className="config__container-edit">
                <input type="text" placeholder='enter username'/>
                <input type="file" />
              </div>
              <button type='button' onClick={logout}>Log Out</button>
            </div>
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
          <div className='admin__main-edit'>
            {getActive().cover.isCover && <Cover />}
            <button 
              type='button' 
              onClick={() => onUpdate({
                ...getActive(),
                cover: {
                  isCover: true,
                  value: getActive().cover.value
                },
              })}>Cover</button>
            <input
              type='text'
              value={getActive().title}
              placeholder="Title"
              onChange={(e) => onEdit('title', e.target.value)}
            />
            <input
              type='text'
              value={getActive().bio}
              placeholder="Bio"
              onChange={(e) => onEdit('bio', e.target.value)}
            />
            <input
              type='text'
              value={getActive().body}
              placeholder="Body"
              onChange={(e) => onEdit('body', e.target.value)}
            />
          </div>
        </div> : 
        <div className='admin__load'>
          <div className='admin__load-logo'></div>
          <p className='admin__load-info'>Fetching data</p>
        </div>
        }
      </section>
    )
  }
}