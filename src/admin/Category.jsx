import React, { useEffect, useState } from "react";
import axios from "axios";
import { addCategory, getCategory } from "../api";

export default function Category() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const result = await getCategory();
      setCategories(result.data.data);
    };
    getCategories();
  }, []);

  const handleAddCategory = async () => {
    const result = await addCategory({ category });
    setCategories([result.data.data]);

    setCategory("");
  };
  // console.log("category", category);
  // console.log("categories", categories);

  const handleCategoryInput = (e) => {
    setCategory(e.target.value);
  };

  const handleRemoveCdategory = (e) => {};

  return (
    <div className=" w-full p-2 flex justify-center">
      <div className=" bg-orange-300 w-1/2 h-fit flex flex-col items-center rounded-md p-3">
        <h2 className=" font-medium m-2">Add Category</h2>
        <div className=" w-full flex items-center justify-center">
          <input
            className=" w-2/4 h-fit text-black bg-slate-400 rounded-md outline-none p-1 px-2"
            onChange={handleCategoryInput}
            value={category}
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className=" bg-red-500 rounded-md p-1 m-2 px-2"
          >
            Add
          </button>
        </div>
        <div className=" w-fit ">
          {categories?.map((item, index) => (
            <div
              className="  h-fit w-40 flex flex-col justify-center items-center "
              key={index}
            >
              {item.category.map((item) => (
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
    </div>
  );
}
