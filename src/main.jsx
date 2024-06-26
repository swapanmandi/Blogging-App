import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './admin/Dashboard.jsx'
import Signup from './admin/Signup.jsx'
import Login from './admin/Login.jsx'
import Blog from './pages/Blog.jsx'
import CreatePost from './admin/CreatePost.jsx'
import Error from './component/Error.jsx'
import Home from './pages/Home.jsx'
import Latest from './pages/Latest.jsx'
import PostDetails from './pages/PostDetails.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/blogs",
        element: <Blog />
      },
      {
        path: "/latest",
        element: <Latest />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/latest/:postId",
        element: <PostDetails />
      }
      ,{
        path: '/blogs/:postId',
        element: <PostDetails />
      },
      {
        path: '/related-posts/:postId',
        element: <PostDetails />
      }
      ,{
        path: '/trending-posts/:postId',
        element: <PostDetails />
      }
    ]
},
{
  path: "/dashboard",
  element: <Dashboard />,
  errorElement: <Error />,
  children : [
    {
      path: "/dashboard",
      element: <CreatePost />
    },
    {
      path: "/dashboard/signup",
      element: <Signup />
    },
    {
      path: "/dashboard/login",
      element: <Login />
    }
  ]
},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
