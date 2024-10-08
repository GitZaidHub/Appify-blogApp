import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState ,useEffect} from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  
  const [isMenuOpen, setisMenuOpen] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [author, setAuthor] = useState([])

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${currentUser?.id}`);
        setAuthor(response?.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser?.id) {
      getAuthor(); // Only call if currentUser has a valid id
    }
  }, [currentUser?.id]); // Dependency array to fetch author only when currentUser.id changes

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  return (
    <nav className=" flex justify-between sticky top-0 z-10 text-white w-full items-center backdrop-blur-md px-4 pr-8 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <div className="logo pl-5">
            <img
              className="size-14 rounded-full "
              src="/img/Designer.jpeg"
              alt="logo"
            />
          </div>
        </Link>
        <ul className="md:flex gap-8 w-[60%] hidden justify-between items-center">
          <li>
            <Link
              className="text-lg rounded-2xl bg-neutral-800 px-3 py-2 hover:bg-white hover:text-black"
              to={"/"}
            >
              Home
            </Link>
          </li>
          {currentUser?.id && (
            <li>
              <Link
                className="text-lg rounded-2xl bg-neutral-800 px-3 py-2 hover:bg-white hover:text-black"
                to={"/create"}
              >
                Create
              </Link>
            </li>
          )}
          <li>
            <Link
              className="text-lg rounded-2xl bg-neutral-800 px-3 py-2 hover:bg-white hover:text-black"
              to={"/authors"}
            >
              Authors
            </Link>
          </li>
          {!currentUser?.id && (
            <li>
              <Link
                className="text-lg rounded-2xl bg-neutral-800 px-3 py-2 hover:bg-white hover:text-black"
                to={"/login"}
              >
                Login
              </Link>
            </li>
          )}
          {currentUser?.id && (
            <li className="">
              <img
                id="avatarButton"
                type="button"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="w-10 h-10 rounded-full cursor-pointer"
                src={`${import.meta.env.VITE_BASE_URL_ASSETS}/uploads/${author?.avatar}`}
                alt="User dropdown"
              />

              <div
                id="userDropdown"
                className="z-10 hidden  bg-slate-100 ring-2 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 ">
                  <div>{currentUser.name}</div>
                  <div className="font-medium truncate">
                    {currentUser?.email}
                    
                  </div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    
                    <Link to={`/mypost/${currentUser?.id}`} className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Dashboard
                    </Link>
                      
                    
                  </li>
                  <li>
                    
                    <Link to={`/myprofile/${currentUser?.id}`} className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >My Profile
                    </Link>
                      
                    
                  </li>
                </ul>
                <div className="py-1">
                  <Link  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" to={"/logout"}>
                    
                      Log out
                    
                  </Link>
                </div>
              </div>
            </li>
          )}
        </ul>
        {/* Hamburger Menu for smaller screens */}
        <div className="md:hidden block" onClick={toggleMenu}>
          <RxHamburgerMenu className="text-2xl cursor-pointer" />
        </div>

        {/* Mobile Menu (conditional rendering based on `isMenuOpen`) */}
        <ul
          className={`absolute top-16  right-0 bg-opacity-50 bg-white backdrop-blur-sm text-black rounded-xl flex flex-col items-start gap-6 py-5 pl-5 transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } w-1/3 sm:w-1/2 md:w-1/4`}
        >
          <li>
            <Link className="text-lg" to={"/"} onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link className="text-lg" to={"/create"} onClick={toggleMenu}>
              Create
            </Link>
          </li>

          <li>
            <Link className="text-lg" to={"/authors"} onClick={toggleMenu}>
              Authors
            </Link>
          </li>
          <li>
            <Link className="text-lg" to={"/login"} onClick={toggleMenu}>
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
