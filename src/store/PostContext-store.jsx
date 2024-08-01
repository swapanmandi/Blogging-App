import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      }
      finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, loading, setLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
