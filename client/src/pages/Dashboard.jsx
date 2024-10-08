import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Delete from "../pages/Delete"
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState("");
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const { id } = useParams();

  useEffect(() => {
    const fetchposts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response?.data);
        
      } catch (error) {
        seterror(error.response.data.message);
      }
      setIsLoading(false);
    };

    fetchposts();
  }, []);
 

  return (
    <>
     
    <section className="dashboard flex flex-col gap-2 container h-[80vh] px-1  md:px-4 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex justify-between items-center bg-white bg-opacity-30 p-4 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-1 md:gap-4">
            <img
              src={`${import.meta.env.VITE_BASE_URL_ASSETS}/uploads/${
                post.thumbnail[0]
              }`}
              alt="avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="font-semibold">{post.title}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">

            <Link to={`/post/${post._id}`}><button className="text-gray-900 bg-white bg-opacity-50 border border-gray-300 focus:outline-none hover:bg-yellow-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm md:px-5 px-2 md:py-2.5 py-1 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              View
            </button></Link>
            <Link to={`/posts/${post._id}/edit`} > <button className="text-gray-900 bg-white bg-opacity-50 border border-gray-300 focus:outline-none hover:bg-pink-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm md:px-5 px-2 md:py-2.5 py-1 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Edit
            </button></Link>
              <Delete postID={post._id}/>
            </div>
          </div>
        </div>
      ))}
    </section>
    </>

  );
  
};

export default Dashboard;
