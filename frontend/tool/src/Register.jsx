import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import uni from './uni.jpg'
import logo from './logo.png'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("Annotator");
  const [error, setError] = useState('');
  const [signup, setSignup] = useState([]);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState('')


  const handleSubmit = async(e) =>{
    e.preventDefault();
        if(user && email && password){
        const newUser = {
          email: email,
          username: user,
          password: password,
          password2: password2,
        };

        if(password !== password2){
          setError('Passwords do not match');
        }

    try{
        const response = await axios.post('http://127.0.0.1:8000/register/', newUser);
        setSignup([...signup,response.data]) 
        console.log(response.data)

        setUser('');
        setEmail(''); 
        setPassword('');
        setError('');
        setSubmitted(true);
        navigate('/RegisterVerify', {state: {email: email}});

    }catch(error){
        console.log(error);
        setError('Server error');
    }   
  }; }

  return (
    <div>
      <img src={logo} alt="logo" className="logo" />
      <img src={uni} alt="background" className="bg-image" />
      <div className="login-container">
        <h2>Registration</h2>

        {submitted?(navigate('/Register.jsx')):( 
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="uname"
              placeholder="eg:- John Wick"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
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
             </div>
             <div className="form-group">
            <label htmlFor="confirm-password">Re-enter Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="eg:- abc#123"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reg-btn">REGISTER</button>
          <Link to="/login">Login</Link>
        </form>
        ) }
      </div>
      <p>{error}</p>
    </div> 
  );
};

export default Register;
