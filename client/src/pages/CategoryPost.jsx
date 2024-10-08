import React from "react";
import { useState, useEffect } from "react";
import Postitem from "../Components/Postitem";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";


const CategoryPost = () => {
  const [posts, setPosts] = useState([]);
  const [name, setname] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [error, seterror] = useState('')
  const  {category} =useParams()

  useEffect(() => {
    const fetchposts = async()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/category/${category}`)
        setPosts(response.data)
      } catch (error) {
        seterror(error.response.data.message)
      }
      setIsLoading(false)
    }
      
    
    fetchposts()
    
  }, [])

  

  if(isLoading){
    return <Spinner/>
  }
  
  return (
    <section className=" posts min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center m-10"> Category : {category}</h1>
      
       {posts.length > 0 ? <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map(({_id: id, thumbnail, title, category, author, description,creator,createdAt,postID}) => 
          <Postitem
            key={id}
            authorID={creator}
            postID={id}
            thumbnail={thumbnail}
            title={title}
            category={category}
            author={author}
            description={description}
            createdAt={createdAt}
          />
        )}
      </div> : <h2 className="flex items-center justify-center  text-3xl font-semibold">No Post to Display</h2> }
      </div>
    </section>
  );
};

export default CategoryPost;
