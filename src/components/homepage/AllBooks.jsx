import React, { use } from 'react';
import BooksCard from '../ui/BooksCard';

const booksPromis = fetch('/booksData.json').then(res => res.json())


const AllBooks = () => {

  const books = use(booksPromis)
  return (
    <>
      <h2 className='text-3xl font-bold text-center my-10'>Books</h2>

      <div className='container mx-auto rounded-3xl bg-base-200 my-10 '>
        <div className='container mx-auto my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-20'>
          {
            books.map(book => {

              return <BooksCard key={book.bookId} book= {book}></BooksCard>
            })
          }
        </div>
      </div>
    </>

  );
};

export default AllBooks;
