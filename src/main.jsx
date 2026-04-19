import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes'
import BookProivider from './context/bookContext/BookContext'
import { ToastContainer } from 'react-toastify'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProivider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer/>
    </BookProivider>
  </StrictMode>,
)
