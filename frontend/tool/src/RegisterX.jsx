import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./utils/api";
import uni from "./uni.jpg";
import logo from "./logo.png";

function RegisterX() {
  const [formData, setFormData] = useState({ full_name: "", email: "", password: "" });
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser(formData);
      navigate("/loginX");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div>
      <img src={logo} alt="logo" className="logo" />
      <img src={uni} alt="background" className="bg-image" />
      <div className="login-container">
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Re-enter Password</label>
            <input type="password" name="re_password" placeholder="Confirm Password" onChange={handleRePasswordChange} required />
          </div>
          <button type="submit" className="reg-btn">REGISTER</button>
          <Link to="/loginX">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterX;
