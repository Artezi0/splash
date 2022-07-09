import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import './styles/app.scss'

export default function App() {
  const datas = [
    {
      id: 1,
      avatar: 'https://avatars.githubusercontent.com/u/87239976?v=4',
      cover: '#4C3A51',
      title: 'Ezi',
      bio: 'Starts with Hello World!'
    },
    {
      id: 2,
      avatar: 'https://avatars.githubusercontent.com/u/2681894?v=4',
      cover: '#774360',
      title: 'Sandhika Galih',
      bio: 'Hello World!'
    },
    {
      id: 3,
      avatar: 'https://avatars.githubusercontent.com/u/1332805?v=4',
      cover: '#B25068',
      title: 'CraftzDog',
      bio: 'Hello World!'
    },
    {
      id: 4,
      avatar: 'https://avatars.githubusercontent.com/u/11247099?v=4',
      cover: '#E7AB79',
      title: 'Antfu',
      bio: 'Hello World!'
    }
  ]
  
  return (
    <div className='App'>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          {datas.map(({ id, avatar, cover, title, bio }) => { 
          return (
            <Route 
              key={id}  
              path={id.toString()} 
              element={
                <div className='site'>
                  <img className='site__avatar' src={avatar} alt='avatar' width={100} height={100} />
                  <h1 className='site__username'>{title}</h1>
                  <div className='site__cover' style={{ width: '100px', height: '100px', background: `${cover}` }}></div>
                  <p className='site__bio'>{bio}</p>
                </div>
              } 
            />
          )})}
        </Route>
      </Routes>
    </div>
  )
}
