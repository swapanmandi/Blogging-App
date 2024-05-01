import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './admin/Dashboard.jsx'
import Signup from './admin/Signup.jsx'
import Login from './admin/Login.jsx'
import Blog from './component/Blog.jsx'
import CreatePost from './admin/CreatePost.jsx'
import Error from './component/Error.jsx'
import Home from './component/Home.jsx'
import Latest from './pages/Latest.jsx'
import Post from './pages/Post.jsx'


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
        element: <h1>Contact Page</h1>
      },
      {
        path: "/about",
        element: <h1>About Page</h1>,
      },
      {
        path: "/latest/post/:postId",
        element: <Post />
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
