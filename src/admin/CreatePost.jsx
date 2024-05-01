import React, { useState } from "react";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  //post button handling

  const handleSubmit = (e) => {
    e.preventDefault();
    // onsubmit({ title, content, category });
    console.log(category ,'-', title , '-', content)
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <>
      <div className=" bg-slate-500 flex flex-col items-center h-screen text-black">
        <h1 className=" font-bold m-4">Create New Blog</h1>
        <div className=" flex flex-col">
          <form onSubmit={handleSubmit}>
            <p>Blog Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <p>Content</p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              cols={50}
            ></textarea>

            <label>Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">---</option>
              <option value="tech">Tech</option>
              <option value="travel">Travel</option>
              <option value="blog">Blog</option>
            </select>
            </label>

            <button className=" bg-orange-500 m-3 rounded-md">Saved</button>
            <button className="bg-orange-500 m-3 rounded-md" type="submit">
              Publish
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
