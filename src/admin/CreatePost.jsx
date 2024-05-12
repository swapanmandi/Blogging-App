import axios from "axios";
import React, { useState } from "react";
import ViewPost from "./ViewPost";

export default function Post() {
  const [postData, setPostData] = useState({
    id: 123,
    title: "first blog",
    body: "my first post",
    userId: 45,
    tags: "#first",
  });

  //post button submit handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/create-post", postData)
      console.log('Response', response.data)
      alert(response.data.message)
    } catch (error) {
      console.error("Error to post", error);
      alert('Error to post data')
    }

  };

  //update properties values

  const postHandleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };
  //console.log('input data', postData)

  return (
    <>
      <div className=" bg-slate-500 flex flex-col items-center h-screen text-black">
        <h1 className=" font-bold m-4">Create New Blog</h1>
        <div className=" flex flex-col">
          <form onSubmit={handleSubmit}>
            <label>Id:
              <input type="number" name="id" value={postData.id}></input>
            </label>
            <p>Blog Title</p>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={postHandleChange}
            ></input>
            <p>Content</p>
            <textarea
              name="body"
              value={postData.body}
              onChange={postHandleChange}
              rows={5}
              cols={50}
            ></textarea>

            <label>
              Category
              <select
                name="userId"
                value={postData.userId}
                onChange={postHandleChange}
              >
                <option value="">---</option>
                <option value="tech">Tech</option>
                <option value="travel">Travel</option>
                <option value="blog">Blog</option>
              </select>
            </label>
            <label>
              Tags
              <textarea
                name="tags"
                value={postData.tags}
                onChange={postHandleChange}
              ></textarea>
            </label>

            <button className=" bg-orange-500 m-3 rounded-md">Saved</button>
            <button className="bg-orange-500 m-3 rounded-md" type="submit">
              Publish
            </button>
          </form>
        </div>
        <ViewPost />
      </div>
    </>
  );
}
