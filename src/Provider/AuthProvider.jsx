import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)
  const googleProvider = new GoogleAuthProvider()

  const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const singIn = (email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  const logOut = ()=>{
   setLoading(true)
   return signOut(auth)
  }

  const googleSignIn = () =>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }

  useEffect(()=>{
    const unsubcribe = onAuthStateChanged(auth,currentUser=>{
       setUser(currentUser)
      //  console.log('current user',currentUser)

        //user authorized
       if(currentUser && currentUser.email){
        const loggedUser = {
          email: currentUser.email
        }
    fetch('https://car-doctor-server-tau-two.vercel.app/jwt',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(loggedUser)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log('jwt response',data)
      //warning: local storage is not best place ,,( it's second best place ) to store access token
      localStorage.setItem('car-access-token', data.token)
    })
       }

       else{
        localStorage.removeItem('car-access-token')
       }


       setLoading(false)

    });
    return ()=>{
      return unsubcribe();
    }
  },[])

  const authInfo = {
        user,
        loading,
        createUser,
        singIn,
        logOut,
        googleSignIn
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;