import { createContext, useState, useEffect, useContext } from "react";
import { blogs } from "../api/index.js";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [displayPost, setDisplayPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 250));
        //const response = await axios.get("../src/../backend/posts.json");
        //const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/v1/blog/list`);
        const response = await blogs();
        //console.log("blog list", response.data.data);
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

  const formatdDate = (e) => {
    const date = new Date(e);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const formatTime = (e) => {
    const time = new Date();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    return `${hours}:${minutes} `;
  };

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
        formatdDate,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);

  return context;
};

export default PostContextProvider;
