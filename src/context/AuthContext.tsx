import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router'
import { doc, collection, onSnapshot, updateDoc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut, 
         User} from 'firebase/auth'

import { auth, db } from '../firebase'

interface UserContextType {
  signUp: (email: any, pass: any) => void
  signIn: (email: any, pass: any) => void
  logout: () => void,
  onAdd: (title, bio, body, uid) => Promise<void>
  onUpdate: (updated) => Promise<void>
  getActive: () => any
  user: User
  datas: any[]
}

// @ts-ignore
const UserContext = createContext<UserContextType>()

export function AuthContextProvider({ children }) {
  const [ datas, setDatas ] = useState([])
  const [ user, setUser ] = useState<User>()
  const [ error, setError ] = useState(false)

  const navigate = useNavigate()
  
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) { 
        onSnapshot(collection(db, 'sites'), (snapShot) => {
          let list = []  
          
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() })
          })  
          setDatas(list)
        }, 
        (error) => {
          console.warn(error)
        })  

      }
    })
    
    return () => {
      authChange() 
    }
  }, [])

  function signUp(email, pass) {
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;

      navigate('/admin')
      onAdd('title', 'bio', 'body', user.uid)
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  function signIn(email, pass) {
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)

      navigate('/admin')
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  function logout() {
    signOut(auth)

    navigate('/')
  }

  async function onAdd(title, bio, body, uid) {
    await setDoc(doc(db, 'sites', uid), {
      title: title,
      bio: bio,
      body: body,
    })
    console.log('added')
  }

  async function onUpdate(updated) {
    await updateDoc(doc(db, 'sites', user.uid), {
      title: updated.title,
      bio: updated.bio,
      body: updated.body,
    })
  }

  function getActive() {
    let x = datas.find(({ id }) => id === user.uid)

    return x
  }

  return (
    <UserContext.Provider 
      value={{
        signUp,
        signIn,
        logout,
        getActive,
        onAdd,
        onUpdate,
        datas,
        user,
      }}>
      {children}
    </UserContext.Provider>    
  )
}

export function UserAuth() {
  return useContext(UserContext)
}



