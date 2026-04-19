import React, { useContext, useState } from 'react';
import { data, useLoaderData, useParams } from 'react-router';
import { BookContext } from '../../context/bookContext/BookContext';

const BooksDetails = () => {
  const { id } = useParams();
  // console.log('params', id);
  const books = useLoaderData();
  // console.log(books);
  const expectedBooks = books.find(book => book.bookId == id);
  // console.log(expectedBooks);
  const {handelMarkAsRead,handelWishlist} = useContext(BookContext)


  return (
    <div className='container mx-auto my-10'>
      {/* Main white container */}
      <div className="bg-white max-w-3xl w-full mx-auto rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-0">

          {/* Book Cover */}
          <div className="w-full md:w-72  bg-gray-100 flex items-center justify-center p-8">
            <img src={expectedBooks?.image} alt={expectedBooks?.bookName} className="w-100 shadow-2xl rounded" />
          </div>

          {/* Book Info */}
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold text-gray-900">{expectedBooks?.bookName}</h2>
            <p className="text-gray-500 text-sm mt-1">By : {expectedBooks?.author}</p>

            <div className="divider my-3"></div>

            <p className="text-sm font-semibold text-gray-700">{expectedBooks?.category}</p>

            <div className="divider my-3"></div>

            <div className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-gray-900">Review : </span>
              {expectedBooks?.review}
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm font-semibold text-gray-700">Tag</span>
              {expectedBooks?.tags?.map((tag, index) => (
                <span key={index} className="badge badge-outline text-green-500 border-green-400 px-3">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="divider my-3"></div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-gray-500">Number of Pages:</span>
              <span className="font-semibold text-gray-800">{expectedBooks?.totalPages}</span>

              <span className="text-gray-500">Publisher:</span>
              <span className="font-semibold text-gray-800">{expectedBooks?.publisher}</span>

              <span className="text-gray-500">Year of Publishing:</span>
              <span className="font-semibold text-gray-800">{expectedBooks?.yearOfPublishing}</span>

              <span className="text-gray-500">Rating:</span>
              <span className="font-semibold text-gray-800">{expectedBooks?.rating}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button onClick={()=> handelMarkAsRead(expectedBooks)} className="btn btn-outline btn-sm px-8 rounded-lg">Mark as Read</button>
              <button onClick={()=> handelWishlist(expectedBooks)} className="btn btn-info btn-sm px-8 rounded-lg text-white">Wishlist</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BooksDetails;