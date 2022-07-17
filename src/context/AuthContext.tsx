import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { doc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

interface UserContextType {
  onAdd: (title, bio, body) => Promise<void>,
  datas: any[]
}

// @ts-ignore
const UserContext = createContext<UserContextType>()

export function AuthContextProvider({ children }) {
  const [ datas, setDatas ] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'sites'), (snapshot) => {
      let list = []
      snapshot.docs.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setDatas(list)
    }, (err) => {
      console.warn(err)
    })

    return () => {
      unsub() 
    }
  }, [])

  async function onAdd(title, bio, body) {
    await setDoc(doc(db, 'sites', title), {
      title: title,
      bio: bio,
      body: body
    })
    console.log('added')
  }

  return (
    <UserContext.Provider 
      value={{
        onAdd,
        datas,
      }}>

      {children}
    </UserContext.Provider>    
  )
}

export function UserAuth() {
  return useContext(UserContext)
}



