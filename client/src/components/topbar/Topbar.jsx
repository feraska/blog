import React, { useContext } from 'react';
import "./topbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquareFacebook,faSquareTwitter,faSquarePinterest,faSquareInstagram}
 from "@fortawesome/free-brands-svg-icons"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';
import { PF } from '../../../constant';
import { Logout } from '../../context/Actions';
const Topbar = () => {
    const {user,dispatch} = useContext(Context)
    const handleLogout = () => {
      dispatch(Logout());
    };
    return (
        <div className="top">
            <div className="topLeft">
            <FontAwesomeIcon className='topIcon' icon={faSquareFacebook} />
            <FontAwesomeIcon className='topIcon' icon={faSquareTwitter} />
            <FontAwesomeIcon className='topIcon' icon={faSquarePinterest} />
            <FontAwesomeIcon className='topIcon' icon={faSquareInstagram} />
            </div>
            <div className="topCenter">
            <ul className="topList">
            <li className="topListItem">
                <Link className="link" to="/">
                HOME
                </Link>
            
            </li>
            <li className="topListItem">
            ABOUT
            </li>
            <li className="topListItem">
            CONTACT
            </li>
            <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
            </li>
            {user&&<li className="topListItem" onClick={handleLogout}>
            LOGOUT
            </li>
}

            </ul>

            </div>

            <div className="topRight">
            {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF+user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
            <FontAwesomeIcon className="topSearchIcon" icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}

export default Topbar;