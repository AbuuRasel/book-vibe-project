import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

// ✅ Correctly create the context and export it
export const BookContext = createContext();

const BookProvider = ({ children }) => {

    const [storedBooks, setStoredBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

  const handelMarkAsRead = (currentBook) => {
    const isExistBook = [...storedBooks, ...wishlist].find(book => book.bookId === currentBook.bookId);
    if (isExistBook) {
      toast.error('The book already exists in your read list');
      return;
    }
    setStoredBooks([...storedBooks, currentBook]);
    toast.success(`${currentBook.bookName} added to read list`);
  }

  const handelWishlist = (currentBook) => {
    const isExistInReadList = [...storedBooks, ...wishlist].find((book) => book.bookId === currentBook.bookId);
    if (isExistInReadList) {
      toast.error('This book is already in your read list');
      return;
    }

    const isExistWishlist = [...storedBooks, ...wishlist].find(book => book.bookId === currentBook.bookId);
    if (isExistWishlist) {
      toast.error('The book already exists in your wishlist');
      return;
    }
    setWishlist([...wishlist, currentBook]);
    toast.success(`${currentBook.bookName} added to wishlist`);
  }

  const data = {
    storedBooks,
    setStoredBooks,
    handelMarkAsRead,
    wishlist,
    setWishlist,
    handelWishlist,
  }

  // ✅ BookContext is now properly declared above
  return (
    <BookContext.Provider value={data}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;