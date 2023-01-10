import React from 'react'
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import UserContext from '../contexts/UserContext';
export default function Login() {
  const {isRegistering} = React.useContext(UserContext);
  return (
    <div className='login-page'>
      {isRegistering ?
        <SignUpModal
        />
        :
        <LoginModal
        />
      }
    </div>
  );
}
