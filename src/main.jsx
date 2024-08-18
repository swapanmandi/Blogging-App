import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminHome from "./admin/Home.jsx";
import Signup from "./admin/Signup.jsx";
import Login from "./admin/Login.jsx";
import Blog from "./pages/Blog.jsx";
import CreatePost from "./admin/CreatePost.jsx";
import Error from "./component/Error.jsx";
import Home from "./pages/Home.jsx";
import Latest from "./pages/Latest.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import ProtectedRoute from "../src/admin/ProtectedRoute.jsx";
import { AuthProvider } from "../src/admin/store/AuthProvider.jsx";
import Dashboard from "./admin/Dashboard.jsx";
//import List from "./admin/List.jsx";
import DraftList from "./admin/DraftList.jsx";
import Profile from "./admin/Profile.jsx";
import SignUp from "./component/SignUp.jsx";
import SignIn from "./component/SignIn.jsx";
import Settings from "./component/Settings.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx"


const List = lazy(() => import("./admin/List.jsx"));

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
         element: <PrivateRoute />,
         children : [
          {
            path:"",
            element: <Latest/>
          }
         ]
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
        path: "/blogs/:postId",
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
        element: <SignUp />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      
    ],
  },
  {
    path: "/admin",
    element: <AdminHome />,
    errorElement: <Error />,
    children: [
      {
        path: "/admin",
        element: <Signup />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/signup",
        element: <Signup />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
      {
        path: "/admin/dashboard/create-post",
        element: <CreatePost />,
      },
      {
        path: "/admin/dashboard/list",
        element: 
        <Suspense fallback={<div>Loading</div>}>
          <List />
        </Suspense>
        ,
      },
      {
        path: "/admin/dashboard/draftList",
        element: <DraftList />,
      },
      {
        path: "/admin/dashboard/blog/api/edit/:id",
        element: <CreatePost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
