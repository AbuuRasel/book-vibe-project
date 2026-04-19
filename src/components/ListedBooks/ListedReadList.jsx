import React, { useContext } from 'react';
import { BookContext } from '../../context/bookContext/BookContext';
import BooksCard from '../ui/BooksCard';
import { CiStar, CiUser } from 'react-icons/ci';
import { Link } from 'react-router';
import NoDataUi from '../ui/NoDataUi';
import { LuBookOpen } from 'react-icons/lu';

const ListedReadList = ({ book }) => {
  const { handelMarkAsRead, storedBooks, wishlist } = useContext(BookContext)
  if (storedBooks.length === 0) {
    return <NoDataUi></NoDataUi>
  }
  return (
    <div className='container mx-auto my-10'>
      {
        storedBooks.map((book, ind) => (
          <div key={ind} className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full flex flex-col sm:flex-row items-center my-4 gap-4 p-4 hover:shadow-md transition-shadow duration-300">

            {/* Book Image */}
            <img
              src={book.image}
              alt={book.bookName}
              className="w-30  rounded-lg shadow flex-shrink-0"
            />

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 min-w-0 w-full">

              {/* Title & Author */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">{book.bookName}</h2>
                <p className="text-sm md:text-base text-gray-400 mt-0.5">By : {book.author}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-gray-500">Tag</span>
                {book.tags.map((tag, index) => (
                  <span key={index} className="text-xs font-semibold text-green-500 border border-green-400 rounded-full px-2.5 py-0.5">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Publisher & Pages */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <CiUser className="w-4 h-4" />
                  Publisher: {book.publisher}
                </span>
                <span className="flex items-center gap-1">
                  <LuBookOpen className="w-4 h-4" />
                  Page {book.totalPages}
                </span>
              </div>

              {/* Category, Rating, Button */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-blue-400 bg-blue-50 rounded-full px-3 py-1 font-medium">
                  Category: {book.category}
                </span>
                <span className="text-xs text-orange-400 bg-orange-50 rounded-full px-3 py-1 font-medium">
                  Rating: {book.rating}
                </span>
                <Link
                  to={`/booksDetails/${book.bookId}`}
                  className="sm:ml-auto text-sm font-semibold text-white bg-green-500 hover:bg-green-600 active:scale-95 transition-all rounded-full px-4 py-1.5 whitespace-nowrap"
                >
                  View Details
                </Link>
              </div>

            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ListedReadList;