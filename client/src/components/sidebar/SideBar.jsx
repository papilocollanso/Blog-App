import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';
import axios from 'axios';


const SideBar = () => {
  const [cats, setCats] = useState([]);

useEffect( ()=>{
   const getCats = async () =>{
   const res= await axios.get("/categories");
   setCats(res.data);

   }
   getCats();
},[]);


  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="profile pix"
        />
        <p>
          My name is Prosper Collins, I'm a MERN Stack Developer. I love to
          solve human problems through codes. I am fun to be with. Very
          responsible and I have a good obervation spirit within!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
           {cats.map(cat => {
                  return (
                    <Link
                      key={cat._id}
                      className="link"
                      to={`/?cat=${cat.name}`}
                    >
                      <li key={cat._id} className="sidebarListItem">
                        {cat.name}
                      </li>
                    </Link>
                  );
           })}
       
        </ul>
      </div>



      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook"></i>
          <i className="sidebarIcon fa-brands fa-twitter"></i>
          <i className="sidebarIcon fa-brands fa-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
