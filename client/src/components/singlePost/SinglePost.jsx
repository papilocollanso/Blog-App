import React, {useEffect, useState, useContext} from 'react';
import { useLocation,  } from 'react-router';
import axios from 'axios';
import {Link } from 'react-router-dom'; 
import { Context } from "../../context/Context";


import './singlepost.css'

const  SinglePost = () =>{
  const PF = "http://localhost:5000/images/";
   const { user } = useContext(Context);

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("")
     const [updatedMode, setUpdateMode] = useState(false);


   const handleUpdate = async  () => {

     try {
       await axios.put(`/posts/${post._id}`, {
        
         
           username: user.username,
           title,
           desc
         
       });
      // window.location.reload();
      setUpdateMode(false);
     } catch (err) {
       console.log(err);
     } 


   };
 
    const handleDelete =  async () => {
         try{
      await axios.delete(`/posts/${post._id}`, {
        data:{
          username:user.username
        } });
      window.location.replace("/");
         }
         catch(err){
          console.log(err);
         }
    }

   useEffect(()=>{
       const getPost = async () =>{
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
       }
       getPost();
   
},[path]);

 
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt="single pic"
          />
        )}

        {updatedMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus="true"
            onChange={(e)=>setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={(e) => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <span></span>
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updatedMode ? (
          <textarea  className="singlePostDescInput"  value={desc}
          onChange={(e)=>setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}

        {updatedMode &&
        
        
        <button className='singlePostButton' onClick={handleUpdate}>Update  </button>
        }
        </div>
    </div>
  );
}

export default SinglePost;