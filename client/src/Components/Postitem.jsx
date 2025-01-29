import React from 'react'
import PostAuthor from './PostAuthor';
import { Link } from 'react-router-dom';

const Postitem = ({ id, postID, thumbnail, title, author, description, category, authorID, createdAt }) => {
  const shortdesc = description.length > 150 ? description.substr(0, 145) + '...' : description;
  const shorttitle = title.length > 30 ? title.substr(0, 50) + '...' : title;

  return (
   <section className="postitem max-w-md mx-auto h-[450px] p-4 bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:shadow-2xl duration-300">
  <div className='relative w-full h-[250px] overflow-hidden rounded-md'>
    <img
      className='w-full h-full object-cover rounded-md'
      src={thumbnail[0]}
      alt=""
    />
  </div>

  <Link className="font-semibold py-2 text-lg" to={`/post/${postID}`}>
    <h1 className="text-gray-800 truncate">{shorttitle}</h1>
  </Link>

  <p className="text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: shortdesc }}></p>

  <div className='author flex justify-between items-center py-2'>
    <PostAuthor authorID={authorID} createdAt={createdAt} />
    <Link
      className="rounded-xl px-2 py-1 hover:text-white hover:bg-gray-800 bg-gray-300 transition duration-300"
      to={`/posts/category/${category}`}
    >
      <p className="text-sm">{category}</p>
    </Link>
  </div>
</section>
  );
};


export default Postitem
