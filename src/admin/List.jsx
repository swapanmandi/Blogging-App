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
        "http://localhost:3000/blog/api/allPostList",
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
        `http://localhost:3000/blog/api/delete/${id}`,
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

  return (
    <>
      <div className=" w-full h-screen bg-slate-800">
        {editList?.map((item) => (
          <div
            className=" h-10 bg-red-600 rounded-md p-1 w-full m-3 flex justify-around"
            key={item._id}
          >
            <h3 className="">
              <Link to={`/admin/dashboard/blog/api/edit/${item._id}`}>
                {item.title}
              </Link>
            </h3>
            <span>{item.status}</span>
            <span>{item.category}</span>
            <span>
              <Link to={`/admin/dashboard/blog/api/edit/${item._id}`}>
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
