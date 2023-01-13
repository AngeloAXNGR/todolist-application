import React from 'react'
import UserContext from '../contexts/UserContext'

export default function Header() {
  const {accountName, handleSignOut} = React.useContext(UserContext);
  return (
    <header>
      <h1>ReactTodo</h1>
      <p>Signed In using: {accountName} </p>
      <button onClick={handleSignOut}>Sign Out</button>
    </header>
  )
}
