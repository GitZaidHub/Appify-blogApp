import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";




const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [error, seterror] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()
  useEffect(() => {
  const getAuthors = async()=>{
    setIsLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`)
      setAuthors(response?.data)
    } catch (error) {
      seterror(error.response.data.message)
    }
    setIsLoading(false)
  }
  getAuthors()
  }, [])
  if(isLoading){
    return <Spinner/>
  }

  return (
    <section className="Authors container mx-auto h-[80vh]">
    <h1 className="lg:text-4xl md:text-2xl text-xl font-bold text-center m-10">Authors</h1>
    <div className="mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {authors.map((p) => (
        <Link
          key={p._id}
          to={`/posts/users/${p._id}`}
          className="author-item group flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
        >
          {/* Avatar Section */}
          <div className="relative flex items-center justify-center p-6">
            <img
              className="rounded-full h-24 w-24 object-cover border-4 border-white shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2"
              src={p.avatar}
              alt={p.name}
            />
          </div>
          {/* Name and Post Count Section */}
          <div className="p-4 text-center">
            <h1 className="text-lg font-bold text-gray-800 transform transition-all duration-300 group-hover:scale-105 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-500 to-purple-500">
              {p.name}
            </h1>
            <p className="text-sm text-gray-600">{p.posts} posts</p>
          </div>
        </Link>
      ))}
    </div>
    {error && (
      <p className="flex items-center justify-center text-red-900 text-xl mt-4">{error}</p>
    )}
  </section>
  


  );
};

export default Authors;
