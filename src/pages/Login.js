import React from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase_config';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import UserContext from '../contexts/UserContext';
export default function Login() {
  const {credentials, isRegistering} = React.useContext(UserContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        navigate('/home')
      }
    })
  }, [])


  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        navigate('/home');
      })
      .catch((err) => alert(err.message));
  }

  const handleRegister = () => {
    if(credentials.email !== credentials.emailConfirm || credentials.password !== credentials.passwordConfirm){
      alert('Make sure emails and passwords match with confirm fields')
    }else{
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(() => {
          navigate('home')
        })
        .catch((err) => alert(err.message));
    }
  }
  return (
    <div className='login-page'>
      {isRegistering ?
        <SignUpModal
          handleRegister={handleRegister}
        />
        :
        <LoginModal
          handleSignIn={handleSignIn}
        />
      }
    </div>
  );
}
