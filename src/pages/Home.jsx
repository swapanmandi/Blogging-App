import React from "react";
import MainSidebar from "../component/MainSidebar";
import PostList from "../component/PostList";
import Carousel from "../component/Carousel.jsx";

import SavedPosts from "../component/SavedPosts.jsx";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col  lg:overflow-hidden lg:flex lg:flex-row bg-slate-50 text-cyan-400">
        <div className=" mt-5 lg:flex lg:flex-col lg:w-full">
          <Carousel />

          <main className=" overflow-hidden lg:w-11/12 m-4">
            <PostList />
          </main>
        </div>

        <div className=" w-1/3">
          <MainSidebar />
          <SavedPosts />
        </div>
      </div>
    </>
  );
}
