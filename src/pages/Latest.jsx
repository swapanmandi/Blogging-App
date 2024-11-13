import React, { useContext } from "react";
import { usePostContext } from "../store/PostContext-store";
import { Link } from "react-router-dom";
import PostList from "../component/PostList";

export default function Latest() {
  const { posts, loading } = usePostContext();

  return (
    <>
      <div className="">
        <PostList />
      </div>
    </>
  );
}
