import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Blogs from './pages/Blogs.jsx'
import Navbar from './components/Navbar.jsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <><Navbar /><Home /> </>
  },
  { 
    path: '/about', 
    element: <><Navbar /><About /> </>
  },
  { 
    path: '/signup', 
    element: <><Navbar /><SignUp /> </> 
  },
  { 
    path: '/login', 
    element: <><Navbar /><Login /> </>
  },
  { 
    path: '/blogs', 
    element: <><Navbar /><Blogs /> </>  
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App