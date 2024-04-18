import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './admin/Dashboard.jsx'
import Signup from './admin/Signup.jsx'
import Login from './admin/Login.jsx'
import Blog from './component/Blog.jsx'
import Post from './admin/Post.jsx'
import Error from './component/Error.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Blog />
      },
      {
        path: "/blogs",
        element: <Blog />
      },
      {
        path: "/latest",
        element: <h1>Latest Page</h1>
      },
      {
        path: "/contact",
        element: <h1>Contact Page</h1>
      },
      {
        path: "/about",
        element: <h1>About Page</h1>,
      },
      
    ]
},
{
  path: "/dashboard",
  element: <Dashboard />,
  errorElement: <Error />,
  children : [
    {
      path: "/dashboard",
      element: <Post />
    },
    {
      path: "/dashboard/signup",
      element: <Signup />
    },
    {
      path: "/dashboard/login",
      element: <Login />
    },
    {
      path: "/dashboard/creat-post",
      element: <Post />
    }
  ]
},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
