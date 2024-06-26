import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.get("../src/../backend/posts.json");

        setPosts(response.data);

        setLoading(false);
      } catch {
        (error) => {
          console.error("There are something wrong to get data.", error);
          setLoading(false);
        };
      }
    };

    fetchData();
  }, []);

  return (
    <PostContext.Provider value={{ posts, loading, setLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
