import React from 'react'
import UserContext from '../contexts/UserContext';
import EmailIcon from '../images/email.svg';
import PassWordIcon from '../images/password.svg';
export default function SignUpModal() {
  const {credentials,setIsRegistering, handleChange, handleRegister} = React.useContext(UserContext);


  const handleKeyPress = (event, taskTitle) =>{
    if(event.key === "Enter"){
      handleRegister()
    }
  }

  return (
    <div className="sign-up-modal">
      <h1 className="modal-title">Sign Up</h1>

      <div className="form-inputs">
        <div className="form-row">
          <img src={EmailIcon} alt="" />
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="form-row">
          <img src={EmailIcon} alt="" />
          <input
            placeholder="Confirm Email"
            type="email"
            id="email-confirm"
            name="emailConfirm"
            value={credentials.emailConfirm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="form-row">
          <img src={PassWordIcon} alt="" />
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="form-row">
          <img src={PassWordIcon} alt="" />
          <input
            placeholder="Confirm Password"
            type="password"
            id="password-confirm"
            name="passwordConfirm"
            value={credentials.passwordConfirm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button onClick={handleRegister}>Sign Up</button>
        <button onClick={() => setIsRegistering(false)}>Go Back</button>
      </div>
    </div>
  )
}
