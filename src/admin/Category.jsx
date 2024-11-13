import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get("http://localhost:3000/app/get/category", {
        withCredentials: true,
      });

      setCategories(result.data.data);
    };
    getCategories();
  }, [category]);

  const handleAddCategory = async () => {
    const result = await axios.post(
      "http://localhost:3000/app/create/category",
      { category },
      {
        withCredentials: true,
      }
    );

    setCategory("");
  };
  console.log("category", category);
  console.log("categories", categories);

  const handleCategoryInput = (e) => {
    setCategory(e.target.value);
  };

  const handleRemoveCdategory = (e) => {

  };

  return (
    <>
      <div className=" flex space-x-10">
        <div>
          <h2>Add Category</h2>
          <div>
            <input
              className=" text-black bg-slate-400"
              onChange={handleCategoryInput}
              value={category}
            ></input>
            <button
              type="button"
              onClick={handleAddCategory}
              className=" bg-red-500 rounded-md p-1 m-2"
            >
              Add
            </button>
          </div>
        </div>
        <div className="">
          {categories?.map((item, index) => (
            <div className=" bg-red-100 h-fit w-40 flex flex-col justify-center items-center " key={index}>
              
                {item.category.map(item => (
                  <div className=" m-3" key={item}>
                    <span className=" bg-red-400 p-1 m-1 rounded-md">{item}</span>
                    <span
                className=" w-6 text-center h-8 p-1 rounded-md bg-red-400 cursor-pointer"
                onClick={() => handleRemoveCdategory(item)}
              >
                X
              </span>
                    </div>
                ))}
              </div>
          ))}
        </div>
      </div>
    </>
  );
}
