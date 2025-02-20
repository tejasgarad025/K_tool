import React, { useContext, useState } from "react";
import uni from './uni.jpg'
import logo from './logo.png'
import './App.css';
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from './AuthContext'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://127.0.0.1:8000/token/", {
        email : email,
        password : password
      });
      const {access} = response.data;

      if(!access){
        console.error("no access token recieved")
        return;
      }

      localStorage.setItem('Token', access)
      setAuth(access)
      console.log('access_token : ', access)
      navigate('/home')
    }
  
    catch(error){
      console.error("login failed", error);
    }
  };

  return (
    <div className="app-container">
      <img src={logo} alt="logo" className="logo" />
      <img src={uni} alt="background" className="bg-image" />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="eg:- abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="eg:- abc#123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="/loginverify" id="forgot-pas">Forgot password?</a>
          </div>
          <button type="submit" className="reg-btn">LOGIN</button>
          <Link to="/register">Register now</Link>
        </form>
      </div>
 </div>
);
};

export default Login;
