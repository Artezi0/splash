import { Routes, Route } from 'react-router-dom'

import { UserAuth } from './context/AuthContext'
import Admin from './components/Admin'
import View from './components/View'

import './styles/app.scss'
import SignUp from './components/SignUp'
import { useState } from 'react'
import SignIn from './components/SignIn'

export default function App() {  
  const [ signIn, isSignIn ] = useState(false)
  const { datas } = UserAuth()

  return (
    <Routes>
      <Route path='/' >
        <Route index element={signIn ? <SignIn isSignIn={isSignIn}/> : <SignUp isSignIn={isSignIn}/>} />
        <Route path='admin' element={<Admin />}/>
        {datas.map(({id, title, bio, body}) => {
          return (
            <Route 
              key={id}
              path={id} 
              element={
                <View 
                  title={title}
                  bio={bio}
                  body={body}
                />
              } 
            />
          )
        })}
      </Route>
    </Routes>
  )
}
