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
     
    <section className="dashboard flex flex-col gap-4 container h-auto px-2 md:px-4 mx-auto pb-10">
  <h1 className="lg:text-4xl md:text-3xl text-xl font-bold mb-6 text-center">Dashboard</h1>
  {posts.map((post) => (
    <div
      key={post._id}
      className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-lg shadow-md transition-transform transform hover:shadow-lg duration-300"
    >
      <div className="flex flex-col md:flex-row items-center gap-3">

        {post.thumbnail[0] ? (
          <img
            src={post.thumbnail[0]}
            alt="posts"
            className="h-14 w-14 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-gray-200 flex justify-center items-center border-2 border-gray-300">
            <p className="text-gray-500">No Image</p>
          </div>
        )}
        <p className="font-semibold md:text-lg text-md">{post.title}</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link to={`/post/${post._id}`}>
          <button className="text-gray-900 bg-white bg-opacity-70 border border-gray-300 focus:outline-none hover:bg-yellow-300 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm md:px-4 px-3 md:py-2 py-1 transition duration-200">
            View
          </button>
        </Link>
        <Link to={`/posts/${post._id}/edit`}>
          <button className="text-gray-900 bg-white bg-opacity-70 border border-gray-300 focus:outline-none hover:bg-pink-300 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm md:px-4 px-3 md:py-2 py-1 transition duration-200">
            Edit
          </button>
        </Link>
        <Delete postID={post._id} />
      </div>
    </div>
  ))}
</section>
    </>

  );
  
};

export default Dashboard;
