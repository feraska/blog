import React, { useContext, useState } from 'react';
import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../context/Context';
import { PF, proxy } from '../../../constant';
import { UpdateFailure, UpdateStart, UpdateSuccess } from '../../context/Actions';
import axios from 'axios';
  

  
const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UpdateStart());
    let updatedUser = {
      userId: user._id
    };
    if(username!=="") {
      updatedUser = {...updatedUser,username} 
    }
      if(email!=="") {
        updatedUser = {...updatedUser,email}
      }
      if(password!=="") {
        updatedUser = {...updatedUser,password}
      }
      console.log(updatedUser)
      
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`${proxy}/upload`, data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(`${proxy}/users/${user._id}`,updatedUser);
      setSuccess(true);
      dispatch(UpdateSuccess(res.data) );
    } catch (err) {
      dispatch(UpdateFailure());
    }
  };
    return (
        <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
              <label htmlFor="fileInput">
              <FontAwesomeIcon icon={faCircleUser} className='settingsPPIcon'/>
                
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
            {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
            )}
          </form>
        </div>
        <Sidebar />
      </div>
    )
}

export default Settings;