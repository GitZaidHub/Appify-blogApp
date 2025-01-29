import React, { useState } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase" // Import Firebase storage
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";

const Userprofile = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatartIstouched, setAvatartIstouched] = useState(false);
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, seterror] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { name, avatar, email, bio } = response.data;
        setName(name);
        setAvatar(avatar);
        setBio(bio);
        setEmail(email);
      } catch (error) {
        seterror(error.response.data.message);
      }
    };
    fetchUser();
  }, []);

  const changeAvatar = async () => {
    setAvatartIstouched(false);
    try {
      // Firebase storage reference
      const avatarRef = ref(storage, `avatars/${avatar.name}`);
      
      // Upload image to Firebase storage
      const snapshot = await uploadBytes(avatarRef, avatar);
      
      // Get image URL from Firebase storage
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      // Send image URL to backend instead of the file itself
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
        { avatarURL: downloadURL }, // Pass the image URL
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response)
      setAvatar(downloadURL); // Update avatar with URL from Firebase
      toast.success(`Avatar changed`, { duration: 4000, position: "top-center" });
    } catch (error) {
      seterror(error.response.data.message);
    }
  };
  

  const updateDetail = async (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,  // Adding email to match the backend logic
      currentPassword,
      newPassword,
      bio,
    };

    try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/users/edit-user`,
      userData,
      { withCredentials: true, headers: { authorization: `Bearer ${token}` } }
    );
    if(response.status ==  200){
      // log user out
      navigate('/logout')
      
    }
    } catch (error) {
      seterror(error.response.data.message)
      console.log(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col justify-center items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        My Profile
      </h1>

      {error && (
        <p className="text-sm font-semibold mb-8 text-red-600 text-center">
          {error}
        </p>
      )}

      <section className="userprofile container flex flex-col md:flex-row items-center md:gap-12 justify-center w-full max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-0 relative">
          <img
            className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-gray-300 shadow-md"
            src={avatar}
            alt="Avatar"
          />
          <label
            htmlFor="avatar"
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
            onClick={() => setAvatartIstouched(true)}
          >
            <FaRegEdit className="text-gray-600 text-lg" />
          </label>
          <input
            className="hidden"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          {avatartIstouched && (
            <button
              onClick={changeAvatar}
              className="absolute bottom-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600 transition"
            >
              <FaCheck className="inline-block mr-1" /> Save
            </button>
          )}
          <p className="mt-4 text-lg font-semibold text-gray-800">{name}</p>
          <Link to={`/mypost/${id}`}>
            <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
              My Posts
            </button>
          </Link>
        </div>

        {/* Form Section */}
        <form
          className="flex flex-col w-full md:w-1/2 space-y-5"
          onSubmit={updateDetail}
        >
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <textarea
            className="rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-gray-800 text-white w-1/2 mx-auto hover:bg-gray-900 transition"
          >
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
};

export default Userprofile;
