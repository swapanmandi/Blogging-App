import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminHome from './admin/Home.jsx'
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
import ProtectedRoute from "../src/admin/ProtectedRoute.jsx"
import { AuthProvider } from '../src/admin/store/AuthProvider.jsx'
import Dashboard from './admin/Dashboard.jsx'



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
  path: "/admin",
  element: <AdminHome />,
  errorElement: <Error />,
  children : [
    {
      path: "/admin",
  element: <Signup />
    },
    {
      path: "/admin/dashboard",
      element: <ProtectedRoute><Dashboard /> </ProtectedRoute>
    },
    {
      path: "/admin/signup",
      element: <Signup />
    },
    {
      path: "/admin/login",
      element: <Login />
    },{
      path: "/admin/dashboard/create-post",
      element: <CreatePost />
    }
  ]
},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
   
  </React.StrictMode>,
)
