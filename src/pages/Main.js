import React from 'react'
import Header from '../components/Header'
import Project from '../components/Project';
import Task from '../components/Task';
export default function Main() {
  return (
    <div className="main-container">
      <Header
      />

      <main>
        <Project/>
        <Task/>
      </main>
    </div>
  )
}
