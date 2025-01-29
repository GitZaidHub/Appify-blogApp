import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

// Add locales
TimeAgo.addDefaultLocale(en) // Add English as the default locale
TimeAgo.addLocale(ru) // Add Russian as an additional locale


const PostAuthor = ({createdAt,authorID}) => {
  const [author, setAuthor] = useState(null)
  useEffect(() => {
    const getAuthor=async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${authorID}`)
        setAuthor(response?.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  }, [authorID])
  
  return (
    
    <Link className="flex items-center gap-2 mr-3" to={`/posts/users/${authorID}`}>
  <div className="avatar">
    <img className="rounded-full w-11 h-11 object-cover" src={author?.avatar} alt="avatar" />
  </div>
  <div className="author-detail">
    <p className="font-serif text-sm">{author?.name}</p>
    <p className="font-thin text-xs"><ReactTimeAgo date={new Date(createdAt)} locale="en-US" /></p>
  </div>
</Link>

  );
};

export default PostAuthor;
{/*<div className="flex items-center gap-2 mr-3  ">
        <Link to={"posts/users/sdfs"} >

        <div>
          <img
            className="rounded-full size-11"
            src={"./img/avatar1.jpg"}
            alt="avatar"
          />
        </div>
        </Link>
        <div>

        <p className="font-serif">Zayn </p>
        <p className="font-thin" >just Now</p>
        </div>
 
      </div> */}