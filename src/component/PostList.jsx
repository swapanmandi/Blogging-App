import React, { useContext, useEffect, useState } from "react";
import { usePostContext } from "../store/PostContext-store.jsx";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RelatedPosts from "./RelatedPosts.jsx";
import axios from "axios";
import { useSettings } from "../store/SettingsContext.jsx";

export default function PostList() {
  const { loading, displayPost, formatdDate } = usePostContext();

  const [isOpenedFilter, setIsOpenedFilter] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    date: "",
    startDate: "",
    endDate: "",
    sort: "",
  });

  const [popularPosts, setPopularPosts] = useState(null);
  const [isGrid, setIsGrid] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [peginateList, setPeginateList] = useState([]);

  const { showAdminOnList = true, showDateOnList = true, permalinkType = "title" } =
    useSettings()?.settings || {};

  useEffect(() => {
    setFilteredPosts(displayPost);
  }, [displayPost]);

  const handlePeginate = (number) => {
    setCurrentPage(number);
    console.log("clicked");
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredPosts?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPosts.length / itemPerPage);
  const peginatePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    if (totalPages < 5 || currentPage < 5) {
      setPeginateList(peginatePages.slice(0, 5));
    } else if (currentPage > totalPages - 4) {
      setPeginateList(peginatePages.slice(totalPages - 5, totalPages));
    } else {
      setPeginateList(peginatePages.slice(currentPage - 3, currentPage + 2));
    }
  }, [currentPage, totalPages]);

  const handleFilterOpen = () => setIsOpenedFilter(true);
  const handleFilterClose = () => setIsOpenedFilter(false);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  //filtering posts
  const handleFilter = () => {
    let tempPosts = [...displayPost];

    if (filter.category) {
      tempPosts = tempPosts.filter((item) => item.category === filter.category);
    }

    if (filter.date) {
      tempPosts = tempPosts.filter(
        (item) =>
          new Date(item.publishedAt).setHours(0, 0, 0, 0) ===
          new Date(filter.date).setHours(0, 0, 0, 0)
      );
    }

    if (filter.startDate && filter.endDate) {
      const start = new Date(filter.startDate).setHours(0, 0, 0, 0);
      const end = new Date(filter.endDate).setHours(23, 59, 59, 999);
      tempPosts = tempPosts.filter((item) => {
        const newPosts = new Date(item.publishedAt);
        return newPosts >= start && newPosts <= end;
      });
    }

    if (filter.sort === "asc") {
      tempPosts = tempPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sort === "desc") {
      tempPosts = tempPosts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filter.sort === "latest") {
      tempPosts = tempPosts.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    } else if (filter.sort === "oldest") {
      tempPosts = tempPosts.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    }

    setFilteredPosts(tempPosts);
  };

  const handleLayout = () => setIsGrid(!isGrid);

  useEffect(() => {
    const handlePopularPosts = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/blog/popular-posts`
      );
      setPopularPosts(result.data.data);
    };

    handlePopularPosts();
  }, []);

  return (
    <>
      <div className=" overflow-hidden lg:w-full">
        <div className=" flex justify-between mx-2">
          <h2
            onClick={handleFilterOpen}
            className=" px-2 bg-yellow-500 w-fit p-1 text-black rounded-sm font-semibold"
          >
            Filter
          </h2>
          <button
            onClick={handleLayout}
            className=" px-2 bg-yellow-500 w-fit p-1 text-black rounded-sm font-semibold"
          >
            {isGrid ? "Flex" : "Grid"}
          </button>
        </div>

        {isOpenedFilter && (
          <div className=" absolute lg:w-7/12  bg-cyan-600 text-black rounded-md p-1">
            <span
              onClick={handleFilterClose}
              className="absolute -top-6 -right-4 h-6 w-6 text-center rounded-full bg-red-600"
            >
              X
            </span>

            <div className=" space-x-2 p-3 rounded-md h-fit lg:w-fit">
              <label>
                Category:
                <select
                  value={filter.category}
                  onChange={handleFilterChange}
                  className=" m-2 rounded-sm"
                  name="category"
                >
                  <option value={""}>---</option>
                  <option value={"life Style"}>Life Style</option>
                  <option value={"tech"}>Tech</option>
                  <option value={"traveller"}>Traveller</option>
                  <option value={"sport"}>Sport</option>
                  <option value={"education"}>Education</option>
                </select>
              </label>

              <label>
                Date
                <input
                  value={filter.date}
                  onChange={handleFilterChange}
                  className=" m-2 rounded-sm"
                  type="date"
                  name="date"
                ></input>
              </label>
              <label>
                Start Date
                <input
                  value={filter.startDate}
                  onChange={handleFilterChange}
                  className=" m-2 rounded-sm"
                  type="date"
                  name="startDate"
                ></input>
              </label>

              <label>
                End Date
                <input
                  value={filter.endDate}
                  onChange={handleFilterChange}
                  className=" m-2 rounded-sm"
                  type="date"
                  name="endDate"
                ></input>
              </label>

              <label>
                Sort By
                <select
                  value={filter.sort}
                  onChange={handleFilterChange}
                  className=" m-2 rounded-sm"
                  name="sort"
                >
                  <option value={""}>---</option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                  <option value={"latest"}>New</option>
                  <option value={"oldest"}>Old</option>
                </select>
              </label>
              <button
                onClick={handleFilter}
                className=" bg-cyan-200 p-1 px-3 rounded-md"
              >
                Filter
              </button>
            </div>
          </div>
        )}

        {loading ? (
          [...Array(5)].map((_, index) => (
            <div
              className=" flex flex-col bg-white dark:bg-slate-950 dark:text-white p-4 text-md m-2 rounded-xl"
              key={index}
            >
              <Skeleton width={324} height={281} />
              <div className="p-3 flex flex-col w-full">
                <Skeleton height={30} width={100} />
                <div className="p-4">
                  <Skeleton height={25} width="60%" />
                  <Skeleton height={20} width="40%" />
                  <Skeleton height={20} width="40%" />
                  <Skeleton height={20} width="40%" />
                </div>
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="40%" />
              </div>
            </div>
          ))
        ) : (
          <div
            className={` ${
              isGrid && "grid grid-cols-3"
            } flex flex-col lg:items-center`}
          >
            {currentItems?.map((item) => (
              <div
                key={item._id}
                className={
                  isGrid
                    ? " bg-white w-[280px] m-2 h-[400px] overflow-hidden flex flex-col items-center p-2 mb-8 "
                    : "flex flex-col lg:w-full lg:flex lg:flex-row p-4 text-md m-4 rounded-xl bg-white xs:text-red-500 dark:bg-slate-950 dark:text-white lg:text-green"
                }
              >
                <img
                  className={`${isGrid ? "w-48 h-52" : "w-[324px] h-[281px]"}`}
                  src={`${item.featuredImage}`}
                ></img>

                <div className={isGrid ? " p-1" : "lg:flex lg:flex-col p-3"}>
                  <span className=" flex font-semibold">
                    {/* {item.tags?.map((item) => (
                <h3 className=" rounded-md px-1 w-fit m-1">
                  {item}
                </h3>
              ))} */}
                  </span>
                  <div className={isGrid ? " p-1" : "p-4"}>
                    <h1
                      className={
                        isGrid ? " font-semibold" : "text-xl font-semibold p-3"
                      }
                    >
                      {item.title}
                    </h1>

                    {showAdminOnList && <span className="p-3">👨 Admin</span>}

                    {showDateOnList && (
                      <span className=" p-3">
                        📅 {formatdDate(item.publishedAt)}
                      </span>
                    )}
                  </div>
                  <Link to={`/blogs/${permalinkType === "title" ? item.slug : item._id}`}>
                    <p className=" line-clamp-4">{item.description}</p>
                    <h3 className=" font-semibold">Read More</h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="w-full">
          <div
            className={` flex justify-center items-center p-2 m-4  dark:text-white`}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => handlePeginate(currentPage - 1)}
              className="m-2 font-semibold disabled:text-gray-400"
            >
              {`<<`}Previous
            </button>
            {peginateList.map((item) => (
              <button
                type="button"
                key={item}
                className={`p-2  bg-slate-400 font-semibold m-1 px-3 ${
                  item === currentPage && "text-red-600"
                }`}
                onClick={() => handlePeginate(item)}
              >
                {item}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePeginate(currentPage + 1)}
              className="m-2 font-semibold disabled:text-gray-400"
            >
              Next{`>>`}
            </button>
          </div>
        </div>
        <RelatedPosts posts={popularPosts} heading={"Popular Posts"} />
      </div>
    </>
  );
}
