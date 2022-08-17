import React,{ useContext, useState } from 'react';
import './settings.css';
import axios from 'axios';

import SideBar from '../../components/sidebar/SideBar';
import { Context } from "../../context/Context";


const Settings = () => {
   const { user, dispatch } = useContext(Context);
   const PF = "http://localhost:5000/images/";

   const [file, setFile] = useState(null);
   const [username, setUsername] = useState(null);
   const [email, setEmail] = useState(null);
   const [password, setPassword] = useState(null);
   const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch({type: "UPDATE_START"});
  const updatedUser = {
    userId: user._id,
    username: user.username,
    email,
    password
  };
  if (file) {
    const datas = new FormData();
    const filename = Date.now + file.name;
    datas.append("name", filename);
    datas.append("file", file);
    updatedUser.profilePic = filename;
    try {
      await axios.post("/upload", datas);
     
    } catch (err) {
      console.log(err);
    }
  }
  try {
    console.log(updatedUser);
    const res = await axios.put("/users/"+user._id, updatedUser);
  
     setSuccess(true);
     dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
 
  } catch (err) {
    dispatch({ type: "UPDATE_FAILURE" });
  }
};
  

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle"> Update Your Account</span>
          <span className="settingsDeleteTitle"> Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Pictures</label>
          <div className="settingsPP">
            <img src={file ?  URL.createObjectURL(file) : PF+user.profilePic} alt="pic" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label> Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label> Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label> Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmit" type='submit' >
            
            Update
          </button>
          {success && <span style={{color:'green',textAlign:'center',marginTop:'25px'}}>Profile has been Updated successfully ...</span>}
        </form>
      </div>
      <SideBar />
    </div>
  );
}

export default Settings;