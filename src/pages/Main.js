import React, { useEffect } from 'react'
import Header from '../components/Header'
import { auth } from '../firebase_config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export default function Main() {
  const navigate = useNavigate();

  const handleSignOut = () =>{
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(err => alert(err.message));
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(!user){
        navigate('/');
      }
    })
  })

  return (
    <div className="main-container">
      <Header
        handleSignOut={handleSignOut}
      />
    </div>
  )
}
