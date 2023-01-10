import React from 'react'

export default function Header({handleSignOut}) {
  return (
    <header>
      <h1>TodoList Application</h1>
      <p>Signed In as: </p>
      <button onClick={() => {handleSignOut()}}>Sign Out</button>
    </header>
  )
}
