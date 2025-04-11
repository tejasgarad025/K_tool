import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { loginUser } from "./utils/api";
import uni from './uni.jpg'
import logo from './logo.png'
import './App.css';
import Home from './Home'
import {AuthContext} from './AuthContext'
import axios from 'axios'

function LoginX() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const {access} = response.data;
      if(!access){
        console.error("no access token recieved")
        return;
      }
      localStorage.setItem('Token', access)
      setAuth(access)
      console.log('access_token : ', access)
      /*localStorage.setItem("token", response.data.access);*/
      navigate("/Home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="app-container">
      <img src={logo} alt="logo" className="logo" />
      <img src={uni} alt="background" className="bg-image" />
      <div className="login-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="reg-btn">LOGIN</button>
          <Link to="/registerX">Register now</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginX;

