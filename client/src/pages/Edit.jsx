import React from "react";
import { useState } from "react";
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
  postData.set("category", category);  // Add this line to include category
  thumbnail.forEach((file) => {
    postData.append("thumbnail", file);
  });
    console.log(postData);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}/edit`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status == 201) {
        toast.success('Post has been edited', {
          duration: 4000,
          position: 'top-center',
        
          // Styling
          style: {},
          className: '',
        
          // Custom Icon
          icon: '✅',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
        
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
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
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="create-post md:mx-auto container bg-slate-100 bg-opacity-20 rounded-md p-6 h-auto md:w-2/3 w-full">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Create Post
        </h1>
        {error && <p className="text-red-900 font-bold">{error}</p>}
        <form className="mx-auto space-y-6" onSubmit={editPost}>
          {/* Title input */}
          <input
            type="text"
            className="w-full sm:w-2/3 mx-auto px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-Black"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Post Title"
            autoFocus
          />

          {/* Category Select */}
          <select
            name="category"
            className="w-full sm:w-1/3 mx-auto px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
            className="mx-4 my-5 overflow-scroll bg-white h-60 rounded-lg"
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
          <label className="text-white bg-slate-500 rounded-xl  p-2" htmlFor="">
            {" "}
            ◉ Either choose one or two images
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 py-2 px-4  rounded-lg text-white w-3/4 mx-auto ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-300 `}
          >
            {isLoading ? "Updating..." : "Update Post" }
          </button>
        </form>
      </div>
    </section>
  );
};

export default Edit;
