import QRCode from 'react-qr-code'
import { FaCaretRight, FaCaretDown } from 'react-icons/fa'

import { useRef, useState, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import '../styles/app.scss'

export default function Admin() {
  const { user, logout, onUpdate, getActive } = UserAuth()
  
  const [ userModule, setUserModule ] = useState(false)
  const [ share, setShare ] = useState(false)
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

  const UserModule = () => {
    return (
      <div className='admin__main-config'>
        <h3>Preference</h3>
        <button type='button' onClick={logout}>Log Out</button>
        <button type='button'>Dark theme</button>
        <a href='https://github.com/Artezi0/splash' target='_blank'>Help & support</a>
      </div>
    )
  }

  const Share = () => {
    function copyLink() {
      navigator.clipboard.writeText('http://localhost:3000/' + getActive().id).then(() => {
        alert('Copied to clipboard')
      })
    }

    return (
      <div className='admin__main-share'>
        <div className='share__header'>
          <h3>Share</h3>
          <p>Here is your unique Linktree QR code that will direct people to your Linktree when scanned.</p>
        </div>
        <QRCode 
          className='share__qr'
          title='Splash Site'
          value={'http://localhost:3000/' + getActive().id} 
          bgColor='#FFF'
          fgColor='#000'
          size={128}
        />
        <button type='button' onClick={copyLink}>
          <svg width="16" height="36" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M59.939 120V80.0814H79.9593V40.0407H59.939V0H39.9186V40.0407H19.8983V80.0814H39.9186V120H59.939ZM19.8983 40.0407V20.0203H0V40.0407H19.8983ZM99.9796 40.0407V20.0203H79.9593V40.0407H99.9796ZM19.8983 99.9797V80.0814H0V99.9797H19.8983ZM99.9796 99.9797V80.0814H79.9593V99.9797H99.9796Z" fill="#FF462D"/>
          </svg>
          Copy Splash link
        </button>
        <button type='button'>Download PNG</button>
        <button type='button'>Download SVG</button>
      </div>
    )
  }

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
          {share && <Share />}
          {userModule && <UserModule />}
          <div className='admin__main-topbar'>
            <div className='topbar__menu'>
              <div className='topbar__menu-logo'>
                <svg width="16" height="36" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M59.939 120V80.0814H79.9593V40.0407H59.939V0H39.9186V40.0407H19.8983V80.0814H39.9186V120H59.939ZM19.8983 40.0407V20.0203H0V40.0407H19.8983ZM99.9796 40.0407V20.0203H79.9593V40.0407H99.9796ZM19.8983 99.9797V80.0814H0V99.9797H19.8983ZM99.9796 99.9797V80.0814H79.9593V99.9797H99.9796Z" fill="#FF462D"/>
                </svg>
                <h1>Splash</h1>
              </div>
              <button type='button'>
                <svg width="17" height="18" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.15529 16.6221C6.61623 19.083 9.70119 19.8389 11.1602 19.9883C11.7403 20.0762 12.1094 19.7685 12.1358 19.3203C12.1709 18.9072 11.916 18.5732 11.3975 18.4678C10.0703 18.248 7.33693 17.6064 5.26271 15.5146C1.8965 12.1572 1.22853 6.9453 4.00588 4.15917C6.22951 1.94432 9.92092 2.16405 12.6455 3.63182L13.7969 2.49803C10.2988 0.37108 5.65822 0.300767 2.90725 3.05174C-0.379864 6.34764 0.00685453 12.4736 4.15529 16.6221ZM17.5147 3.86913L18.2617 3.11327C18.6485 2.71776 18.6836 2.14647 18.2969 1.77733L18.0332 1.52245C17.6904 1.20604 17.1367 1.23241 16.7588 1.60155L16.0029 2.35741L17.5147 3.86913ZM8.92775 12.4473L16.8643 4.51952L15.3438 3.0078L7.41603 10.9355L6.65139 12.7812C6.55471 13.0273 6.8008 13.2646 7.0381 13.1767L8.92775 12.4473ZM7.49514 13.9414C10.2988 16.8594 15.124 17.9492 17.7608 15.3213C19.9053 13.168 19.7207 9.34471 17.3828 6.04003L16.2578 7.16503C17.9805 9.70506 18.2969 12.5703 16.6533 14.2139C14.6319 16.2353 11.336 15.3213 9.18264 13.2646L7.49514 13.9414Z" fill="currentColor"/>
                </svg>
              </button>
              <button type='button'>
                <svg width="19" height="16" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.2695 5.41992C14.2188 5.41992 15.0361 4.82227 15.3789 3.99609H18.2705C18.71 3.99609 19.0791 3.60938 19.0791 3.14355C19.0791 2.67773 18.71 2.2998 18.2705 2.2998H15.3789C15.0449 1.46484 14.2275 0.867188 13.2695 0.867188C12.3115 0.867188 11.4941 1.46484 11.1602 2.2998H1.74707C1.28125 2.2998 0.912109 2.67773 0.912109 3.14355C0.912109 3.60938 1.28125 3.99609 1.74707 3.99609H11.1602C11.5029 4.82227 12.3203 5.41992 13.2695 5.41992ZM13.2695 4.22461C12.6631 4.22461 12.1885 3.74121 12.1885 3.14355C12.1885 2.52832 12.6631 2.05371 13.2695 2.05371C13.8848 2.05371 14.3506 2.52832 14.3506 3.14355C14.3506 3.74121 13.8848 4.22461 13.2695 4.22461ZM1.7207 7.78418C1.28125 7.78418 0.912109 8.16211 0.912109 8.62793C0.912109 9.08496 1.28125 9.47168 1.7207 9.47168H4.70898C5.05176 10.3154 5.86914 10.9043 6.82715 10.9043C7.77637 10.9043 8.59375 10.3154 8.93652 9.47168H18.2441C18.71 9.47168 19.0791 9.09375 19.0791 8.62793C19.0791 8.16211 18.71 7.78418 18.2441 7.78418H8.93652C8.59375 6.94922 7.77637 6.36035 6.82715 6.36035C5.86914 6.36035 5.05176 6.94922 4.70898 7.78418H1.7207ZM6.82715 9.71777C6.2207 9.71777 5.7373 9.23438 5.7373 8.62793C5.7373 8.0127 6.2207 7.54688 6.82715 7.54688C7.43359 7.54688 7.9082 8.0127 7.9082 8.62793C7.9082 9.23438 7.43359 9.71777 6.82715 9.71777ZM13.2695 16.3887C14.2275 16.3887 15.0449 15.791 15.3789 14.9561H18.2705C18.71 14.9561 19.0791 14.5781 19.0791 14.1123C19.0791 13.6377 18.71 13.2686 18.2705 13.2686H15.3789C15.0449 12.4336 14.2275 11.8359 13.2695 11.8359C12.3203 11.8359 11.4941 12.4336 11.1602 13.2686H1.74707C1.28125 13.2686 0.912109 13.6465 0.912109 14.1123C0.912109 14.5693 1.28125 14.9561 1.74707 14.9561H11.1602C11.4941 15.791 12.3115 16.3887 13.2695 16.3887ZM13.2695 15.1934C12.6631 15.1934 12.1885 14.71 12.1885 14.1123C12.1885 13.4971 12.6631 13.0312 13.2695 13.0312C13.8848 13.0312 14.3506 13.4971 14.3506 14.1123C14.3506 14.71 13.8848 15.1934 13.2695 15.1934Z" fill="currentColor"/>
                </svg>
              </button>
              <button type='button' onClick={() => setShare(!share)}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.58691 13.3018L10.9316 11.9395C9.89453 11.8516 9.14746 11.5088 8.61133 10.9727C7.12598 9.48731 7.12598 7.38672 8.60254 5.91895L11.5205 2.99219C13.0059 1.51563 15.0977 1.50684 16.583 2.99219C18.0771 4.48633 18.0596 6.57813 16.5918 8.05469L15.0977 9.54004C15.3789 10.1904 15.4756 10.9814 15.3174 11.667L17.8311 9.16211C19.9932 7.00879 20.002 3.93262 17.8223 1.75293C15.6338 -0.435545 12.5752 -0.417967 10.4131 1.74414L7.35449 4.80274C5.19238 6.96485 5.18359 10.0322 7.36328 12.2119C7.87305 12.7305 8.57617 13.1172 9.58691 13.3018ZM10.4043 5.875L9.05957 7.23731C10.0967 7.33399 10.8438 7.66797 11.3799 8.2041C12.874 9.68946 12.8652 11.79 11.3887 13.2666L8.4707 16.1846C6.98535 17.6699 4.89355 17.6699 3.41699 16.1846C1.92285 14.6904 1.93164 12.6074 3.4082 11.1309L4.89355 9.63672C4.6123 8.99512 4.52441 8.2041 4.67383 7.50977L2.16016 10.0234C-0.00195312 12.1768 -0.0107422 15.2441 2.16895 17.4238C4.35742 19.6123 7.41602 19.5947 9.57812 17.4414L12.6367 14.374C14.7988 12.2119 14.8076 9.14453 12.6279 6.96485C12.1182 6.45508 11.4238 6.06836 10.4043 5.875Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <p className='topbar__site'><span>Draft / </span>{getActive().title}</p>
            <div className='topbar__account'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 112 112" onClick={() => setUserModule(!userModule)}>
                <g>
                  <rect width="112" height="112" fill={getActive().profile.background} />
                  <path
                    d="M77.4624 78.9593C78.2802 68.3428 73.7143 58.8833 71.3291 55.4806L87.6847 48.335C92.5913 49.9683 94.1587 65.6887 94.3291 73.3448C94.3291 73.3448 90.7513 73.8552 88.7069 75.3864C86.6219 76.948 83.0847 80.4905 77.4624 78.9593Z"
                    fill="white"
                    stroke="#84B5D9"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M86.4336 58C87.3281 58 88.3914 58 88.3914 61C91.0574 61.9999 91.3914 67.5 85.3914 70C80.5914 72 79.3914 67.8333 79.3914 65.5C77.9336 64.5 77.6336 62.3 78.4336 61.5C79.2336 60.7 81.3914 61.5 81.8914 62.5L84.8914 61C84.3914 60.5 84.9336 58 86.4336 58H86.4336Z"
                    fill="#B1DEFF"
                  />
                  <path
                    d="M7.06239 52.159C-5.55748 54.1782 -12.682 66.0659 -17.661 73.2769C-18.5194 86.6687 -18.2791 114.379 -10.45 118.088C-2.62094 121.797 16.5053 119.633 25.0898 118.088V122.209C26.4634 122.724 30.1375 123.857 33.846 124.269C37.5545 124.681 40.542 123.067 41.5721 122.209V112.422C42.0872 112.079 44.5595 110.465 50.3283 106.756C57.5393 102.121 61.6598 90.274 60.1146 82.0331C58.9557 75.8521 63.7201 63.4904 66.2955 55.2493C76.0818 57.3094 88.4435 54.2192 89.4736 40.3124C90.1205 31.5801 80.7174 19.9868 63.2051 25.3752C45.6927 30.7636 48.268 52.159 41.5721 59.37C35.3913 53.1891 23.5446 49.5219 7.06239 52.159Z"
                    fill={getActive().profile.theme[0]}
                    stroke={getActive().profile.theme[2]}
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M66.2955 55.2493C64.5786 54.7342 60.9387 53.6011 60.1146 53.189"
                    stroke={getActive().profile.theme[1]}
                    stroke-opacity="0.37"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M41.5721 59.3698C40.8853 60.2283 38.8937 62.1512 36.4214 62.9753"
                    stroke={getActive().profile.theme[1]}
                    stroke-opacity="0.37"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <circle cx="68.8708" cy="42.8876" r="2.06028" fill="black" />
                </g>
              </svg>
              <button type='button' onClick={() => setUserModule(!userModule)}>
                {userModule ? <FaCaretRight />: <FaCaretDown/>}
              </button>
            </div>   
          </div>
          <div className='admin__main-edit'>
            {getActive().cover.isCover && <Cover />}
            <div className="edit__info">              
              <div className="edit__info-action">
                <button 
                  type='button' 
                  onClick={() => onUpdate({
                    ...getActive(),
                    cover: {
                      isCover: true,
                      value: getActive().cover.value
                    },
                  })}>Cover</button>
              </div>
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