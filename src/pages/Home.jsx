import React from "react";
import MainSidebar from "../component/MainSidebar";
import PostList from "../component/PostList";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col w-full overflow-hidden lg:flex lg:flex-row text-cyan-400  md:text-amber-300 lg:text-lime-700">
        
        <main className=" lg:w-8/12">
          <PostList />
        </main>
        <MainSidebar />
      </div>
    </>
  );
}
