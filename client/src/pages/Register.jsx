import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [confrmVisible, setConfrmVisible] = useState(false);
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Update form data dynamically
    setUserData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  };
  const makePassVisible = () => {
    setPassVisible(!passVisible);
  };
  const confrmVisiblebtn = () => {
    setConfrmVisible(!confrmVisible);
  };
  const formhandler = async (e) => {
    e.preventDefault();
    seterror("");
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userData
      );
      console.log(response);
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        seterror("can not register !");
      }
      if (!error) {
        navigate("/login");
      }
    } catch (error) {
      seterror(error.response.data.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <section className="container mx-auto w-full md:w-1/2 py-16 px-4 md:px-24 h-[85vh] flex items-center justify-center relative">
  <div className="bg-white bg-opacity-40 py-8 px-8 md:px-12 rounded-xl backdrop-blur-xl shadow-lg w-full max-w-lg ">
    <h1 className="text-center mb-5 text-3xl font-semibold text-gray-800">
      Sign Up
    </h1>
    
    <form className="flex flex-col gap-4" onSubmit={formhandler}>
      {/* Name Field */}
      <div className="flex flex-col w-3/4 mx-auto">
        <label htmlFor="name" className="text-gray-700 font-medium">Enter Name</label>
        <input
          className="rounded-lg px-3 py-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col w-3/4 mx-auto">
        <label htmlFor="email" className="text-gray-700 font-medium">Enter Email</label>
        <input
          className="rounded-lg px-3 py-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="email"
          placeholder="Enter email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col w-3/4 mx-auto relative">
        <label htmlFor="password" className="text-gray-700 font-medium">Enter Password</label>
        <input
          className="rounded-lg px-3 py-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type={passVisible ? "text" : "password"}
          placeholder="Create Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <div
          className="absolute top-[42px] right-3 cursor-pointer"
          onClick={makePassVisible}
        >
          {passVisible ? (
            <FaRegEye className="text-black" />
          ) : (
            <FaEyeSlash className="text-black" />
          )}
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col w-3/4 mx-auto relative">
        <label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</label>
        <input
          className="rounded-lg px-3 py-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type={confrmVisible ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <div
          className="absolute top-[42px] right-3 cursor-pointer"
          onClick={confrmVisiblebtn}
        >
          {confrmVisible ? (
            <FaRegEye className="text-black" />
          ) : (
            <FaEyeSlash className="text-black" />
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-4 py-2 px-4  rounded-lg text-white w-3/4 mx-auto ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } transition-colors duration-300 `}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Log In Link */}
      <small className="text-center mt-4 w-full text-gray-700">
        Already have an account?{" "}
        <Link className="text-blue-600 hover:underline" to={"/login"}>
          Log In
        </Link>
      </small>
    </form>

    {/* Error Display */}
    {error && (
      <p className="text-center mt-4 text-red-600 font-semibold">{error}</p>
    )}
  </div>

 
  
</section>

  );
};

export default Register;
