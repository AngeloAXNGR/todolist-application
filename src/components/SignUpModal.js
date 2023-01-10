import React from 'react'
import UserContext from '../contexts/UserContext';
export default function SignUpModal() {
  const {credentials,setIsRegistering, handleChange, handleRegister} = React.useContext(UserContext);
  return (
    <div className="sign-up-modal">
      <h1 className="modal-title">Sign Up</h1>

      <div className="form-inputs">
        <input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          placeholder="Confirm Email"
          type="email"
          id="email-confirm"
          name="emailConfirm"
          value={credentials.emailConfirm}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          id="password-confirm"
          name="passwordConfirm"
          value={credentials.passwordConfirm}
          onChange={handleChange}
        />
      </div>

      <div className="form-buttons">
        <button onClick={handleRegister}>Sign Up</button>
        <button onClick={() => setIsRegistering(false)}>Go Back</button>
      </div>
    </div>
  )
}
