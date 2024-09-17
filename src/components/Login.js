import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Form.css";

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("userData")) || {};

    if (
      storedData.email === loginData.email &&
      storedData.password === loginData.password
    ) {
      alert("Login successful!");
      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      navigate("/movies");
    } else {
      setErrorMessage("Invalid Credentials");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">Email:</label>
      <input
        className="form-input"
        type="text"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        required
      />

      <label className="form-label">Password:</label>
      <input
        className="form-input"
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        required
      />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button className="submit-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
