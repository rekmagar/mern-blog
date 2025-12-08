import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/about', element: <div>About Page</div> },
  { path: '/signup', element: <div>Signup Page</div> },
  { path: '/login', element: <div>Login Page</div> },
  { path: '/blogs', element: <div>Blogs Page</div> },
])

const App = () => {
  return (
    <div className='text-red-500'>Hello World</div>
  )
}

export default App