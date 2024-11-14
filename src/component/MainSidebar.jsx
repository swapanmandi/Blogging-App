import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


export default function MainSidebar() {
 
  const [trendPosts, setTrendPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const trendingResult = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/blog/trending-posts`
        );

        setTrendPosts(trendingResult.data.data);
      } catch (error) {
        console.error("Error to fetch trending posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const displayPosts = trendPosts?.slice(0, 5);

  return (
    <>
      {loading ? (
        <div className=" w-full m-2 rounded-xl">
          <div className=" bg-white dark:bg-slate-950 min-h-screen p-3 rounded-md">
            <Skeleton height={30} width={100} />
            {[...Array(6)].map((_, index) => (
              <div className=" flex p-3 items-center" key={index}>
                <Skeleton height={64} width={64} />
                <div className=" p-4 flex flex-col">
                  <Skeleton height={24} width={60} />
                  <Skeleton height={24} width={80} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-orange-500 lg:w-full">
          <aside className=" bg-white dark:bg-slate-950 min-h-screen p-3 rounded-md">
            <div className=" text-wrap">
              <h2 className="  bg-orange-300 font-semibold rounded-md p-1 w-fit">
                Trending Posts
              </h2>
              {displayPosts?.map((item) => (
                <Link to={`/blogs/${item._id}`} key={item._id}>
                  <div key={item._id} className=" flex m-5">
                    <img
                      className=" w-[88 px] h-[88px] rounded-md"
                      src={item.image}
                    ></img>
                    <div className=" bg-purple-500 w-full rounded-sm text-black">
                      <h2 className=" font-semibold font-serif m-4">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </aside>
        </div>
      )}
    </>
  );
}
