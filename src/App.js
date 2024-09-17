import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import CompanyInfo from "./components/CompanyInfo";
import "./App.css";
import "./css/NavBar.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="nav-list">
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link to="/company-info">Company Info</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/company-info" element={<CompanyInfo />} />
      </Routes>
    </div>
  );
}

export default App;
