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
  onAdd: (uid) => Promise<void>
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

  const icon = () => {
    const denoColors = [
      ["#fecaca", "#dc2626", "#7f1d1d"],
      ["#d9f99d", "#65a30d", "#365314"],
      ["#a7f3d0", "#059669", "#064e3b"],
      ["#bae6fd", "#0284c7", "#0c4a6e"],
      ["#ddd6fe", "#7c3aed", "#4c1d95"],
    ]

    const bgColors = [
      "#fee2e2",
      "#ffedd5",
      "#fef3c7",
      "#fef9c3",
      "#ecfccb",
      "#dcfce7",
      "#d1fae5",
      "#ccfbf1",
    ]
    
    const denoColor = Math.floor(Math.random() * denoColors.length)    
    const bgColor = Math.floor(Math.random() * bgColors.length)    

    return(
      [
        denoColors[denoColor],
        bgColors[bgColor] 
      ]
    )
  }

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
      onAdd(user.uid)
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

  async function onAdd(uid) {
    let newNote = {
      profile: {
        theme: icon()[0],
        background: icon()[1]
      },
      title: 'Untitled',
      body: `# Hello world`,
      bio: `# Hello world`,
      cover: {
        isCover: false,
        value: '#E8E7E3'
      },
    }

    await setDoc(doc(db, 'sites', uid), newNote)
    console.log('added')
  }

  async function onUpdate(updated) {
    await updateDoc(doc(db, 'sites', user.uid), {
      title: updated.title,
      body: updated.body,
      bio: updated.bio,
      cover: {
        isCover: updated.cover.isCover,
        value: updated.cover.value
      }
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



