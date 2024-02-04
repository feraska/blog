import React, { useState } from 'react';
import "./register.css"
import { Link, useNavigate } from 'react-router-dom';
import {proxy} from "../../../constant"
import axios from 'axios';
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${proxy}/auth/register`, {
        username,
        email,
        password,
      });
      navigate("/login")
    } catch (err) {
      setError(true);
    }
  };
    return (
        <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input 
          className="registerInput"
          type="text" 
          placeholder="Enter your username..."  
          onChange={(e) => setUsername(e.target.value)}/>
          <label>Email</label>
          <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
           />
          <label>Password</label>
          <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
          <button className="registerButton">Register</button>
        </form>
          <button className="registerLoginButton">
            <Link to="/login" className='link'>Login</Link>
            </button>
            {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      </div>
    )
}

export default Register;