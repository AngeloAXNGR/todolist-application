import React from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db} from '../firebase_config';
import {set, ref, onValue, remove, update} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [credentials, setCredentials] = React.useState(
    {
      email:'',
      emailConfirm:'',
      password:'',
      passwordConfirm:''
    }
  );
  const [accountName, setAccounName] = React.useState('');
  const [isRegistering, setIsRegistering] = React.useState(false);

  const handleChange = (event) => {
    const {name, type, value, checked} = event.target;
    setCredentials(prevCredentials => {
      return {...prevCredentials,
        [name] : type === "checkbox" ? checked : value
      }
    });
  }

  const navigate = useNavigate();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        navigate('/home');
        setAccounName(user.email)
      }
    })
  }, [])

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        navigate('/home');
      })
      .catch((err) => alert(err.message));
    
      setCredentials({
        email:'',
        emailConfirm:'',
        password:'',
        passwordConfirm:''
      });
  }

  const handleSignOut = () =>{
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(err => alert(err.message));
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
      
      setCredentials({
        email:'',
        emailConfirm:'',
        password:'',
        passwordConfirm:''
      });
    }
  }

  return(
    <UserContext.Provider
      value={
        {
          credentials,
          accountName, 
          isRegistering,
          setIsRegistering ,
          handleChange,
          handleSignIn,
          handleSignOut,
          handleRegister,
        }}
    >
      {children}
    </UserContext.Provider>
  );
}


export default UserContext;