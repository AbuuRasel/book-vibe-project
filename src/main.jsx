import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Books from './pages/books/Books'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/homepage/HomePage'

const router = createBrowserRouter([{
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
  ]

}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
