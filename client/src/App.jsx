import { useState } from "react";
import "./App.css";
import 'flowbite';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import toast, { Toaster } from "react-hot-toast"; 
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [authorID, setAuthorID] = useState(null)

  return (
    <>
  <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#fff1f2',
      color: '#262626',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
  />
    <div className="">
      
      <Header authorID={authorID}/>
      <Outlet setAuthorID={setAuthorID} />
      <Footer/>
    </div>
    </>
  );
}

export default App;
