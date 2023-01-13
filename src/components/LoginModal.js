import React from 'react'
import UserContext from '../contexts/UserContext'
import EmailIcon from '../images/email.svg';
import PassWordIcon from '../images/password.svg';

export default function LoginModal() {
  const {credentials,setIsRegistering, handleChange, handleSignIn} = React.useContext(UserContext);
  return (
    <div className="login-modal">
      <h1 className="modal-title">Login</h1>
      <div className="form-inputs">
        <div class="form-row">
          <img src={EmailIcon} alt="" />
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div class="form-row">
          <img src={PassWordIcon} alt="" />
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={() => setIsRegistering(true)}>Create an Account</button>
      </div>
    </div>
  )
}
