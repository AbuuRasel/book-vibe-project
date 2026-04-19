import React from 'react';
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/homepage/HomePage';
import Books from '../pages/books/Books';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '../pages/errorPage/ErrorPage';
import BooksDetails from '../pages/booksDetails/BooksDetails';

export const router = createBrowserRouter([{
  path: '/',
  element: <MainLayout></MainLayout>,

  children: [
    {
      index:true,
      element:<HomePage></HomePage>
    },
    {
      path: '/books',
      element: <Books></Books>
    },
    {
      path: '/booksDetails/:id',
      Component: BooksDetails ,
      loader: ()=> fetch('/booksData.json')
    }
  ],
  errorElement: <ErrorPage></ErrorPage>

}])