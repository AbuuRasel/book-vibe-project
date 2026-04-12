import React from 'react';
import { CiStar } from 'react-icons/ci';

const BooksCard = ({book}) => {
  return (
    <div className="card bg-base-100 rounded-3xl shadow-sm">
      <figure className='p-10 w-full h-100'>
        <img className='w-70 h-full rounded-3xl '
          src={book.image}
          alt="Shoes" />
      </figure>
      <div className="card-body ">
        <div className='flex items-center gap-5'>
          {book.tags.map((tag, index) => (
            <div key={index} className="badge text-green-500 bg-green-100 font-semibold">{tag}</div>
          )
          )

          }
        </div>

        <h2 className="card-title text-2xl font-bold">
          {book.bookName}
        </h2>
        <p className='font-semibold text-lg'> By: {book.author}</p>
        <div className="divider"></div>
        <div className="card-actions justify-between">
          <div className="badge font-semibold">{book.category}</div>
          <div className="badge font-semibold">{book.rating}  <CiStar /></div>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;