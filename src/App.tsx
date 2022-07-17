import { Routes, Route } from 'react-router-dom'

import { UserAuth } from './context/AuthContext'
import Admin from './components/Admin'
import View from './components/View'

import './styles/app.scss'

export default function App() {  
  const { datas } = UserAuth()
  return (
    <Routes>
      <Route path='/' >
        <Route index element={<Admin />} />
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
