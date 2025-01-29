import React from "react";
import { useState } from "react";
import upload from "../lib/upload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast"; 

import axios from "axios";
import Spinner from "../Components/Spinner";

const Edit = () => {
  const [title, settitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      ["bold", "Italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "-1" },
      ],
      ["links", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Bussiness",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${id}`
        );
        settitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);

      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
  
    const postData = new FormData();
    postData.set("title", title);
    postData.set("description", description);
    postData.set("category", category);
  
    try {
      setIsLoading(true);
  
      // Step 1: Upload thumbnails to Firebase
      const uploadedUrls = await Promise.all(
        thumbnail.map(async (file) => {
          const url = await upload(file); // Upload each file to Firebase and get the URL
          console.log("Uploaded URL is: ", url);
          return url;
        })
      );
  
      // Step 2: Add uploaded Firebase URLs to postData
      uploadedUrls.forEach((url, index) => {
        postData.append(`thumbnails[${index}]`, url); // Append the URLs to postData
      });
  
      // Step 3: Send the postData to the backend
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}/edit`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response from backend: ", response.data);
  
      if (response.status === 201) {
        toast.success("Post has been edited", {
          duration: 4000,
          position: "top-center",
          icon: "✅",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        seterror(error.response.data.message);
      } else {
        seterror("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <section className="create-post md:mx-auto container bg-[#f7f4f4]  shadow-lg rounded-lg mb-10 p-10 h-auto md:w-2/3 w-full">
          <div className="mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
              Create Post
            </h1>
            {error && (
              <p className="text-red-600 font-bold mb-4 border border-red-600 bg-red-100 p-2 rounded">
                {error}
              </p>
            )}
            <form className="mx-auto space-x-1 space-y-6" onSubmit={editPost}>
              {/* Title input */}
              <input
                type="text"
                className="w-full sm:w-2/3 mx-auto px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black transition duration-200 ease-in-out"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Post Title"
                autoFocus
              />
    
              {/* Category Select */}
              <select
                name="category"
                className="w-full sm:w-1/3 mx-auto px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition duration-200 ease-in-out"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {POST_CATEGORIES.map((cat) => (
                  <option key={cat} className="text-black">
                    {cat}
                  </option>
                ))}
              </select>
    
              {/* Description (Rich Text Editor) */}
              <ReactQuill
                className="mx-4 my-5 overflow-scroll bg-white h-60 rounded-lg shadow-md"
                modules={modules}
                formats={formats}
                value={description}
                onChange={setDescription}
              />
    
              {/* File Upload */}
              <input
                type="file"
                className="w-full sm:w-2/3 mx-auto text-white"
                onChange={(e) => setThumbnail([...e.target.files])} // Handle multiple files
                accept=".png,.jpeg,.jpg"
                multiple // Enable selecting multiple files
              />
              <p className="text-white bg-slate-500 rounded-xl w-1/2 p-2 mx-auto text-center">
                ◉ Either choose one or two images
              </p>
    
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 py-3 px-6 rounded-lg text-white w-3/4 mx-auto ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors duration-300 shadow-md`}
              >
                {isLoading ? "Updating..." : "Update Post"}
              </button>
            </form>
          </div>
        </section>
  );
};

export default Edit;
