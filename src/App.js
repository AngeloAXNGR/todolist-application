import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import {Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Routes>
          <Route path="/home" element={<Main/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
