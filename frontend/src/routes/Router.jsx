import React from 'react'
import { Link, Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'

const AppRouter = ({isAuthenticated}) => {
  return (
    <Router>
        <div> 
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Use PrivateRoute to protect the TransactionTable */}
            {/* <PrivateRoute path="/" element={<Home />} /> */}
            <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
  )
}

export default AppRouter