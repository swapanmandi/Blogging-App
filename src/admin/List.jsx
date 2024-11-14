import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function List() {
  const [editList, setEditList] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const list = async (req, res) => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/blog/api/allPostList`,
        {
          withCredentials: true,
        }
      );
      toast(response.message);
      console.log("li", response.data.data);
      setEditList(response.data.data);
    };
    list();
  }, [isDeleted]);

  // delete

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/blog/api/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast(result.data.message);
      setIsDeleted(true);
    } catch (error) {
      console.log("error to delete post", error);
    }
  };

  const formatDate = (e) => {
   const date = new Date(e)
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
   
  };

  return (
    <>
      <div className=" w-full h-fit min-h-screen bg-slate-800">
        <div className=" h-fit text-black bg-slate-400 p-1 w-full m-1 flex justify-around mb-4">
          <h3 className=" w-80">Title</h3>
          <span>Published Date</span>
          <div className=" w-60">Category</div>
          <span>Edit</span>
          <span className=" cursor-pointer">Delete</span>
        </div>

        {editList?.map((item) => (
          <div
            className=" h-fit text-black bg-slate-300  p-1 w-full m-1 my-2 flex justify-around"
            key={item._id}
          >
            <h3 className=" w-80">{item.title}</h3>
            <span>{formatDate(item.publishedAt)}</span>
            <div className=" w-60"><span className="">{item.category}</span></div>
            <span>
              <Link to={`/admin/dashboard/blog/post/edit/${item._id}`}>
                Edit
              </Link>
            </span>
            <span
              className=" cursor-pointer"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </span>
          </div>
        ))}
        <ToastContainer />
      </div>
    </>
  );
}
