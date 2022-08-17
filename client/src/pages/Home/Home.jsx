import React, { Fragment, useState, useEffect } from 'react'
import './home.css'
import Header from '../../components/header/Header';
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import axios from "axios";
import { useLocation } from 'react-router';


const Home =() => {

  

  const [posts, setPosts]  = useState([]);
  const {search} = useLocation();


  useEffect(()=>{

   const fetchPosts = async () =>{
   const res =  await  axios.get("/posts" + search);
   setPosts(res.data)
     
   }
   fetchPosts()


  },[search]);

  return (
    <Fragment>
      <Header />
      <div className="home">
      <Posts posts={posts}/>
      <SideBar/>
        
      </div>
    </Fragment>
  );
}

export default Home;
