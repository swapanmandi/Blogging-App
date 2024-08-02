import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [displayPost, setDisplayPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        //const response = await axios.get("../src/../backend/posts.json");
        const response = await axios.get("http://localhost:3000/blog/list", {
          withCredentials: false,
        });
        console.log("post api data", response.data.data);
        setPosts(response.data.data);
      } catch {
        (error) => {
          console.error("There are something wrong to get data.", error);
        };
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setDisplayPost(
        posts.filter((item) =>
          item.title.toLowerCase().includes(searchQuery?.toLowerCase())
        )
      );
    } else {
      setDisplayPost(posts);
    }
  }, [posts, searchQuery]);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        setLoading,
        searchQuery,
        setSearchQuery,
        displayPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
