import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  if (inView) {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="bg-gray-700 text-white">
      {/* Main Landing Page Section */}
      <div className="h-[90vh] relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              Welcome to <span className="text-yellow-400">BlogVibes</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Unlock the world of knowledge and inspiration. Join today for
              exclusive features and community benefits!
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col md:flex-row gap-4"
            >
              <Link to="/register">
                <button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:scale-105 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform shadow-lg">
                  Create Your Free Account
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform shadow-lg">
                  Log In
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-0 right-0 w-1/3 md:w-1/4 lg:w-1/5"
        >
          <img
            src="/img/landing.svg"
            alt="Illustration"
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* About Section */}
      {/* Why Choose BlogVibes Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-20 px-6 md:px-16 lg:px-24">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-8">
            Why Choose <span className="text-blue-500">BlogVibes?</span>
          </h2>
          <p className="text-lg md:text-xl mb-12">
            Unlock the ultimate blogging experience with BlogVibes. Here's why
            we're the best choice for readers and writers alike.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
          {/* Card 1 */}
          <motion.div
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-yellow-400 text-gray-900 p-3 rounded-full mb-4">
              <i className="fas fa-globe text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Global Reach</h3>
            <p className="text-gray-300 text-center">
              Share your blogs with a worldwide audience and connect with
              readers from across the globe.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-blue-500 text-white p-3 rounded-full mb-4">
              <i className="fas fa-pencil-alt text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Easy to Use</h3>
            <p className="text-gray-300 text-center">
              Effortlessly create, edit, and publish blogs with our intuitive
              interface.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-red-500 text-white p-3 rounded-full mb-4">
              <i className="fas fa-heart text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Community Focused</h3>
            <p className="text-gray-300 text-center">
              Engage with a supportive community of writers and readers who
              share your passion for content.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-green-500 text-white p-3 rounded-full mb-4">
              <i className="fas fa-shield-alt text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Secure Platform</h3>
            <p className="text-gray-300 text-center">
              Your data is safe with us. We prioritize your privacy and security
              at every step.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-purple-500 text-white p-3 rounded-full mb-4">
              <i className="fas fa-bolt text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Fast & Reliable</h3>
            <p className="text-gray-300 text-center">
              Experience lightning-fast page loads and seamless browsing.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-orange-500 text-white p-3 rounded-full mb-4">
              <i className="fas fa-star text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Exclusive Features</h3>
            <p className="text-gray-300 text-center">
              Enjoy unique features designed to elevate your blogging
              experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">
            See What Our Users Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <p>
                BlogVibes has completely transformed how I consume content. It's
                an amazing platform!
              </p>
              <span className="block mt-4 text-yellow-400">- John Doe</span>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <p>
                The personalized recommendations are so helpful. I love the
                community here!
              </p>
              <span className="block mt-4 text-yellow-400">- Jane Smith</span>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <p>
                BlogVibes makes blogging easy and fun. Highly recommend it to
                everyone!
              </p>
              <span className="block mt-4 text-yellow-400">- Alex Brown</span>
            </div>
          </div>
        </div>
      </section>
      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black text-white py-10 px-6 md:px-16 lg:px-24">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join <span className="text-yellow-400">BlogVibes</span>?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Start your blogging journey today! Sign in or create an account to
            explore endless possibilities.
          </p>
          <div className="flex justify-center gap-6">
            {/* Sign In Button */}
            <Link to={"/register"}>
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>

            {/* Sign Up Button */}
            <Link to={"/login"}>
              <motion.button
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg shadow-md transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
