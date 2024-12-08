import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminHome from "./admin/Home.jsx";
import AdminSignup from "./admin/Signup.jsx";
import AdminLogin from "./admin/Login.jsx";
import Blog from "./pages/Blog.jsx";
import CreatePost from "./admin/CreatePost.jsx";
import Error from "./component/Error.jsx";
import Home from "./pages/Home.jsx";
import Latest from "./pages/Latest.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import DraftList from "./admin/DraftList.jsx";
import Profile from "./admin/Profile.jsx";
import SignUp from "./component/SignUp.jsx";
import SignIn from "./component/SignIn.jsx";
import Settings from "./component/Settings.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import Category from "./admin/Category.jsx";
import AdminSettings from "./admin/Settings.jsx";
import AdminPrivateRoute from "./admin/AdminPrivateRoute.jsx";
import Routes from "./admin/Routes.jsx";
import List from "./admin/List.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/latest",
        element: <Latest />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/latest/:postId",
        element: <PostDetails />,
      },
      {
        path: `/blogs/:postId`,
        element: <PostDetails />,
      },
      {
        path: "/related-posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "/trending-posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/settings",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Settings />,
          },
        ],
      },
     
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "/admin/signup",
        element: <AdminSignup />,
      },
      {
        path: "/admin/signin",
        element: <AdminLogin />,
      },
    ],
  },

  {
    path: "",
    element: <AdminPrivateRoute />,
    errorElement: <Error />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Routes />,
        children: [
          {
            path: "/admin/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/admin/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/admin/dashboard/create-post",
            element: <CreatePost />,
          },
          {
            path: "/admin/dashboard/list",
            element: <List />,
          },
          {
            path: "/admin/dashboard/draftList",
            element: <DraftList />,
          },
          {
            path: "/admin/dashboard/blog/post/edit/:id",
            element: <CreatePost />,
          },
          {
            path: "/admin/dashboard/blog/category",
            element: <Category />,
          },
          {
            path: "/admin/dashboard/settings",
            element: <AdminSettings />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
