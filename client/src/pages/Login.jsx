import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Login = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setcurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    seterror(" ");
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      const user = await response.data;
      console.log(user);
      setcurrentUser(user);
      toast.success(`${user.name} loged in succefully`, {
        duration: 4000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "🔥",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      navigate("/");
    } catch (error) {
      seterror(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
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
  return (
    <section className="container mx-auto w-full md:w-1/2 my-3 py-16 px-4 md:px-24 h-[85vh] flex items-center justify-center">
      <div className="bg-white bg-opacity-40 py-8 px-8 md:px-12 rounded-xl backdrop-blur-xl shadow-lg w-full max-w-lg">
        <h1 className="text-center mb-6 text-3xl font-bold text-gray-800">
          Log In
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col w-full relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
              type={passVisible ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />

            {/* Toggle Password Visibility */}
            <div
              className="absolute top-10 right-3 cursor-pointer"
              onClick={makePassVisible}
            >
              {passVisible ? (
                <FaRegEye className="text-black" />
              ) : (
                <FaEyeSlash className="text-black" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 py-2 px-4  rounded-lg text-white w-3/4 mx-auto ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-300 `}
          >
            {loading ? "Login..." : "Login"}
          </button>

          {/* Error Message */}
          {error && (
            <h3 className="text-center text-red-600 text-sm font-medium mt-2">
              {error}
            </h3>
          )}

          {/* Register Link Inside Form */}
          <small className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 hover:underline font-medium"
              to="/register"
            >
              Register
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Login;
