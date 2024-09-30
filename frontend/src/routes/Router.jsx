import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {}, []);
  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />
          {/* Use PrivateRoute to protect the TransactionTable */}
          {/* <PrivateRoute path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </>
    </Router>
  );
};

export default AppRouter;
