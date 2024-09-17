// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Form.css";

const Signup = () => {
  const Navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    profession: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Signup successful!");
    Navigate("/login");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">Name:</label>
      <input
        className="form-input"
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        required
      />

      <label className="form-label">Password:</label>
      <input
        className="form-input"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        required
      />

      <label className="form-label">Email:</label>
      <input
        className="form-input"
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />

      <label className="form-label">Phone Number:</label>
      <input
        className="form-input"
        type="tel"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        required
      />

      <label className="form-label">Profession:</label>
      <select
        name="profession"
        value={userData.profession}
        onChange={handleChange}
        required
      >
        <option value="">Select Profession</option>
        <option value="Engineer">Engineer</option>
        <option value="Doctor">Doctor</option>
        <option value="Artist">Artist</option>
        <option value="Other">Other</option>
      </select>

      <button className="submit-btn" type="submit">
        Signup
      </button>
    </form>
  );
};

export default Signup;
