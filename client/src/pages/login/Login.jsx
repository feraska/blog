import React, { useContext, useRef } from 'react';
import "./login.css";
import { Link } from 'react-router-dom';
import {Context} from "../../context/Context"
import { LoginFailure, LoginStart, LoginSuccess } from '../../context/Actions';
import {proxy} from "../../../constant"
import axios from 'axios';
const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try {
      const res = await axios.post(`${proxy}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch(LoginSuccess(res.data));
      
    } catch (err) {
      dispatch(LoginFailure());
    }
  };
    return (
        <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
          <label>Password</label>
          <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
          <button className="loginButton" disabled={isFetching}>Login</button>
        </form>
          <button className="loginRegisterButton">
          <Link to="/register" className='link'>Register</Link>
            </button>
      </div>
    )
}


export default Login;