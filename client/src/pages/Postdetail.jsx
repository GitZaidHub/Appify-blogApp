import React, { useState, useEffect } from "react";
import PostAuthor from "../Components/PostAuthor";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import Spinner from "../Components/Spinner";
import Delete from "./Delete";
const Postdetail = () => {
  const { id } = useParams(); // Get the post ID from the route
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState("");
  //const [likes, setLikes] = useState(0); // State for likes
  //const [hasLiked, setHasLiked] = useState(false); // State to track if the user has liked the post

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`
      );
      console.log("final response  ->", response);
      setPost(response.data);
    } catch (error) {
      seterror(error);
    }
    setIsLoading(false);
  };
  fetchPost();
}, [id]);

  /*const handleLike = async () => {
    try {
      // Send a request to toggle the like status
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}/like`,
        {
          userId: currentUser.id, // Current user's ID
        }
      );
  
      // Extract updated like count and user like status
      const { likes: updatedLikes, hasLiked: updatedHasLiked } = response.data;
  
      // Update local state based on backend response
      setLikes(updatedLikes); // Update the total likes
      setHasLiked(updatedHasLiked); // Update the user's like status
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };*/

  // Carousel settings for Slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <section className="postdetails container md:px-6 px-1 my-4">
      <div className="flex flex-col md:flex-row p-6 rounded-lg shadow-lg bg-white">
        <div className="md:w-1/2">
          {/* Slick Carousel for displaying multiple images */}
          <Slider {...settings}>
            {post.thumbnail && post.thumbnail.length > 0 ? (
              post.thumbnail.map((image, index) => (
                <div key={index}>
                  <img
                    src={image} // Firebase URL
                    className="w-full h-auto object-cover rounded-lg"
                    alt={`Slide ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg"; // Fallback image
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </Slider>
        </div>
        <div className="md:w-1/2 md:pl-6">
          {error && (
            <p className="flex items-center justify-center font-semibold text-red-600">
              {error}
            </p>
          )}
          <div className="flex justify-between items-center mb-4">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="flex md:gap-4 gap-2">
                <Link to={`/posts/${id}/edit`}>
                  <button
                    type="button"
                    className="text-gray-900 bg-white bg-opacity-70 border border-gray-300 focus:outline-none hover:bg-yellow-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Edit
                  </button>
                </Link>

                <Delete postID={id} />
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>

          <p
            className="font-medium text-gray-700 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></p>

          {/*<div className="flex items-center mt-4">
  <button
    onClick={handleLike}
    className={`text-white ${
      hasLiked
        ? "bg-gray-500 hover:bg-gray-600"
        : "bg-blue-500 hover:bg-blue-600"
    } focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2`}
  >
    {hasLiked ? "Liked" : "Like"}
  </button>
  <span className="text-gray-700">{likes} Likes</span>
</div>
*/}
        </div>
      </div>
    </section>
  );
};

export default Postdetail;
