import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './components/hooks/useAuthContext'
import Navbar from './components/navbar'
import Home from '../src/Pages/home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

function App() {
  //15.a. Protecting React routes with the conditionals in lines 20, 24, 28.
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={user ? <Home /> : <Navigate to='/login' />}
            />
            <Route 
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route 
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
